import { join } from 'https://deno.land/std@0.224.0/path/mod.ts'
import { encode } from "https://deno.land/x/msgpack@v1.4/mod.ts";

const rootPath = './station_database/out/main'

try {
    Deno.statSync(rootPath)
} catch {
    console.error('station_database not found')
    Deno.exit(1)
}

function readJson<T>(path: string) {
    const p = join(rootPath, path)

    try {
        const data = Deno.readTextFileSync(p)
        return JSON.parse(data) as T
    } catch {
        return null
    }
}

function validateGeometryData(data: unknown) {
    // 与えられたobjectが [[[lat, lon], [lat, lon], ...], [[lat, lon], [lat, lon], ...], ...] の形式であるかどうかを判定する
    if (!Array.isArray(data)) return false
    if (!Array.isArray(data[0])) return false
    if (!Array.isArray(data[0][0])) return false
    if (typeof data[0][0][0] !== 'number') return false
    return true
}

function convertGeojson(data: Record<string, any> | null) {
    if (data) {
        switch (data.type) {
            case 'FeatureCollection': {
                const result: Record<string, any>[] = []
                for (const feature of data.features) {
                    const geometry = feature.geometry
                    // FeatureCollectionの子(feature)は必ずLineStringが来るものとして扱う
                    if (geometry.type !== 'LineString') throw new Error('error: FeatureCollectionの子がLineStringではありません')
                    result.push(geometry.coordinates)
                }

                if (!validateGeometryData(result)) throw new Error('error: FeatureCollectionのGeometryDataが不正です')

                return {
                    type: 'polyline',
                    data: result
                }
            }

            case 'Feature': {
                const geometry = data.geometry
                if (geometry.type !== 'LineString' && geometry.type !== 'Polygon') throw new Error('error: FeatureのtypeがLineStringまたはPolygonではありません')

                const result = geometry.type === 'LineString' ? [geometry.coordinates] : geometry.coordinates

                if (!validateGeometryData(result)) throw new Error('error: FeatureのGeometryDataが不正です')

                return {
                    type: geometry.type === 'LineString' ? 'polyline' : 'polygon',
                    data: result
                }
            }
        }
    }

    return {
        type: 'polyline',
        data: []
    }
}

const line: Record<string, any>[] = []

for (const item of readJson<Record<string, string>[]>('line.json') ?? []) {
    const lineData = readJson<Record<string, any>>(`line/${item.code}.json`)!
    const polylineData = readJson<Record<string, any>>(`polyline/${item.code}.json`)

    if (!polylineData) console.warn(`warn: polyline ${item.code} not found`)

    lineData['polyline_list'] = convertGeojson(polylineData)
    lineData['station_list'] = lineData['station_list'].map((x: Record<string, string>) => x.id)

    line.push(lineData)
}

const station: Record<string, any>[] = []

for (const item of readJson<Record<string, any>[]>('station.json') ?? []) {
    item['voronoi'] = convertGeojson(item['voronoi'])
    station.push(item)
}

Deno.writeFileSync('station_database.msgpack', encode({
    station,
    line,
    tree: readJson('tree.json'),
}))
