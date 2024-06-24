import { join } from 'https://deno.land/std@0.224.0/path/mod.ts'
import { encode } from 'https://deno.land/x/msgpack@v1.4/mod.ts'
import rewind from 'npm:@mapbox/geojson-rewind@0.5.1'
import type { GeoJson } from './types.d.ts'

const rootPath = './station_database/out/main'

try {
    Deno.statSync(rootPath)
} catch {
    console.error('station_database not found')
    Deno.exit(1)
}

function readJson<T>(path: string, prop?: string) {
    const p = join(rootPath, path)

    try {
        const data = Deno.readTextFileSync(p)
        return prop == null ? JSON.parse(data) as T : JSON.parse(data)[prop] as T
    } catch {
        return null
    }
}

const delaunayPoints = readJson<Record<string, any>[]>('delaunay.json') ?? []
const rawStation = readJson<Record<string, any>[]>('station.json') ?? []
const station: Record<string, any>[] = []

for (const item of rawStation) {
    const delaunay = delaunayPoints.find(x => x.code === item.code)
    if (!delaunay) console.warn(`warn: delaunay ${item.code} not found`)

    item.delaunay = !delaunay ? [] : (delaunay.next as number[]).map(x => {
        const s = rawStation.find(y => y.code === x)?.id
        if (!s) console.warn(`warn: station ${x} not found in delaunay ${item.code}`)
        return s
    })

    const voronoi = item.voronoi as GeoJson
    if (voronoi.geometry.type !== 'LineString') {
        station.push(item)
        continue
    }

    // LineStringからPolygonに変換
    const firstPosition = voronoi.geometry.coordinates[0]
    const polygon = {
        type: 'Polygon',
        coordinates: [
            voronoi.geometry.coordinates.concat([firstPosition])
        ]
    }

    station.push({
        ...item,
        voronoi: {
            ...voronoi,
            geometry: rewind(polygon)
        }
    })

    console.log(`info: station ${item.id} voronoi converted to Polygon`)
}

const line: Record<string, any>[] = []

for (const item of readJson<Record<string, string>[]>('line.json') ?? []) {
    const lineData = readJson<Record<string, any>>(`line/${item.code}.json`)!
    const polylineData = readJson<Record<string, any>>(`polyline/${item.code}.json`)

    if (!polylineData) console.warn(`warn: polyline ${item.code} not found`)

    lineData['polyline_list'] = polylineData
    lineData['station_list'] = lineData['station_list'].map((x: Record<string, string>) => x.id)

    line.push(lineData)
}

const rawTree = readJson<Record<string, any>>('tree.json')
const tree: Record<string, any>[] = []

for (const item of rawTree?.['node_list'] ?? []) {
    const s = rawStation.find(x => x.code === item.code)?.id
    if (!s) console.warn(`warn: station ${item.code} not found in tree`)

    tree.push({
        id: s,
        ...item,
    })
}

const treeRoot = tree.find(x => x.code === rawTree?.['root'])?.id
if (!treeRoot) console.warn('warn: tree root not found')

Deno.writeFileSync('station_database.msgpack', encode({
    station,
    line,
    tree: {
        root: treeRoot,
        node_list: tree
    }
}))
