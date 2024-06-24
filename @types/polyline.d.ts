/**
 * 緯度・経度の組み合わせで座標を表します. リストの長さは２で固定で、経度・緯度の順番です.
 */
type NoName1 = [NoName2, NoName3]
type NoName2 = number
type NoName3 = number
type NoName5 = string

/**
 * Feature(LineString)で表現されるポリラインの集合FeatureCollectionです. フォーマットの詳細はGeoJSONに従います.
 */
export interface Polyline {
    type: "FeatureCollection"
    features: [
        {
            type: "Feature"
            geometry: {
                type: "LineString"
                coordinates: [NoName1, NoName1, ...NoName1[]]
            }
            properties: {
                start: string
                end: string
                closed?: boolean
            }
        },
        ...{
            type: "Feature"
            geometry: {
                type: "LineString"
                coordinates: [NoName1, NoName1, ...NoName1[]]
            }
            properties: {
                start: string
                end: string
                closed?: boolean
            }
        }[]
    ]
    properties: NoName4
}
/**
 * north, south, east, westでポイライン全体の範囲を示します.
 */
interface NoName4 {
    name: NoName5
    north: number
    south: number
    east: number
    west: number
}
