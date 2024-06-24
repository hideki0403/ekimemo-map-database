/**
 * データセット内の駅を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.
 */
type Code = number
/**
 * 駅メモに実装されているのと同じ名称です. データセット内で重複はありません. 重複防止の接尾語が付加される場合があります.
 */
type Name = string
/**
 * １０進小数で表記した緯度（小数点以下６桁）
 */
type Lat = number
/**
 * １０進小数で表記した経度（小数点以下６桁）
 */
type Lng = number
/**
 * 隣接駅の駅コードを要素に持ちます.
 */
type Next = [StationCode, ...StationCode[]]
/**
 * データセット内の駅を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.
 */
type StationCode = number
/**
 * ドロネー分割による隣接点（駅座標）を各駅ごとに定義します.
 */
export type DelaunayArray = Delaunay[]

/**
 * ドロネー分割による隣接点（駅座標）を定義
 */
export interface Delaunay {
    code: Code
    name: Name
    lat: Lat
    lng: Lng
    next: Next
}
