import rewind from 'npm:@mapbox/geojson-rewind@0.5.1'
import { encodeMessagePack, readJson } from './utils.ts'
import * as Schema from './schema.ts'

const delaunayPoints = readJson('delaunay.json', Schema.delaunaySchema, [])
const rawStation = new Map(readJson('station.json', Schema.stationSchema, []).map(x => [x.code, x] as const))
const station: (Schema.StationArray[number] & { delaunay?: number[] })[] = []

for (const item of rawStation.values()) {
    const delaunay = delaunayPoints.find(x => x.code === item.code)
    if (!delaunay) console.warn(`warn: delaunay ${item.code} not found`)

    const x: typeof station[number] = item

    x.delaunay = !delaunay ? [] : delaunay.next.map(i => {
        const s = rawStation.get(i)?.id
        if (!s) console.warn(`warn: station ${i} not found in delaunay ${item.code}`)
        return s
    }).filter(i => i !== undefined)

    const voronoi = x.voronoi
    if (voronoi.geometry.type === 'LineString') {
        // LineStringからPolygonに変換
        const firstPosition = voronoi.geometry.coordinates[0]
        const polygon = {
            type: 'Polygon',
            coordinates: [
                voronoi.geometry.coordinates.concat([firstPosition])
            ]
        }

        x.voronoi = {
            ...voronoi,
            geometry: rewind(polygon)
        }

        console.log(`info: station "${item.id}" voronoi geometry type changed to Polygon`)
    }

    station.push(x)
}

const line: (Omit<Schema.LineDetail, 'station_list'> & { polyline_list?: Schema.Polyline; station_list?: number[] })[] = []

for (const item of readJson('line.json', Schema.lineSchema, [])) {
    const lineData = readJson(`line/${item.code}.json`, Schema.lineDetailSchema)
    if (!lineData) {
        console.warn(`warn: line ${item.code} not found`)
        continue
    }

    const polylineData = readJson(`polyline/${item.code}.json`, Schema.polylineSchema, undefined)
    if (!polylineData) console.warn(`warn: line "${item.code}" polyline not found`)

    const x = lineData as unknown as typeof line[number]
    x.polyline_list = polylineData
    x.station_list = (lineData['station_list'] as unknown as Schema.LineDetail['station_list']).map(x => x.id)

    line.push(x)
}

const rawTree = readJson('tree.json', Schema.treeSegmentSchema)
const tree: {
    id: number
    left?: number
    right?: number
}[] = []

if (!rawTree?.node_list) {
    console.warn('warn: tree node_list does not exist')
} else {
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
}

let treeRoot: number | undefined
if (!rawTree?.root) {
    console.warn('warn: tree root does not exist')
} else {
    treeRoot = rawStation.get(rawTree.root)?.id
}

if (!treeRoot) console.warn('warn: tree root not found')

Deno.writeFileSync('station_database.msgpack', encodeMessagePack({
    station,
    line,
    tree: {
        root: treeRoot,
        node_list: tree
    }
}))
