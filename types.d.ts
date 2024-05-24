export type GeoJson = {
    type: 'Feature',
    geometry: PolygonGeometry | LineStringGeometry,
    properties: Record<string | number | symbol, string>,
}

type PolygonGeometry = {
    type: 'Polygon',
    coordinates: Array<Array<number[]>>,
}

type LineStringGeometry = {
    type: 'LineString',
    coordinates: Array<number[]>,
}
