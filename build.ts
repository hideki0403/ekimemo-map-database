import { join } from 'https://deno.land/std@0.224.0/path/mod.ts'
import { encode } from 'https://deno.land/x/msgpack@v1.4/mod.ts'
import rewind from 'npm:@mapbox/geojson-rewind@0.5.1'

import type * as DelaunayType from './@types/delaunay.d.ts'
import type * as StationType from './@types/station.d.ts'
import type * as LineType from './@types/line.d.ts'
import type * as LineDetailType from './@types/line_detail.d.ts'
import type * as PolylineType from './@types/polyline.d.ts'
import type * as TreeSegmentType from './@types/tree_segment.d.ts'


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

const delaunayPoints = readJson<DelaunayType.DelaunayArray>('delaunay.json') ?? []
const rawStation = new Map((readJson<StationType.StationArray>('station.json') ?? []).map(x => [x.code, x] as const))
const station: StationType.StationArray = []

for (const item of rawStation.values()) {
    const delaunay = delaunayPoints.find(x => x.code === item.code)
    if (!delaunay) console.warn(`warn: delaunay ${item.code} not found`)

    item.delaunay = !delaunay ? [] : delaunay.next.map(x => {
        const s = rawStation.get(x)?.id
        if (!s) console.warn(`warn: station ${x} not found in delaunay ${item.code}`)
        return s
    }).filter(x => x !== undefined) as string[]

    const voronoi = item.voronoi
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

const line: LineType.LineArray = []

for (const item of readJson<LineType.LineArray>('line.json') ?? []) {
    const lineData = readJson<LineDetailType.LineDetail>(`line/${item.code}.json`)!
    const polylineData = readJson<PolylineType.Polyline>(`polyline/${item.code}.json`)

    if (!polylineData) console.warn(`warn: polyline ${item.code} not found`)

    lineData['polyline_list'] = polylineData
    lineData['station_list'] = (lineData['station_list'] as unknown as StationType.StationArray).map(x => x.id)

    line.push(lineData)
}

const rawTree = readJson<TreeSegmentType>('tree.json')
const tree: {
    id: string
    left?: string
    right?: string
}[] = []

for (const item of rawTree?.['node_list'] ?? []) {
    const s = rawStation.get(item.code)
    if (!s) throw console.warn(`warn: station ${item.code} not found in tree`)

    const left = item.left ? rawStation.get(item.left) : null
    const right = item.right ? rawStation.get(item.right) : null

    if (left === undefined) console.warn(`warn: station ${item.left} not found in tree (right)`)
    if (right === undefined) console.warn(`warn: station ${item.right} not found in tree (left)`)

    tree.push({
        id: s.id,
        left: left?.id,
        right: right?.id,
    })
}

const treeRoot = rawStation.get(rawTree?.['root'])?.id
if (!treeRoot) console.warn('warn: tree root not found')

Deno.writeFileSync('station_database.msgpack', encode({
    station,
    line,
    tree: {
        root: treeRoot,
        node_list: tree
    }
}))
