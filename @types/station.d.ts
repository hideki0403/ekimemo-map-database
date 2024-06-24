/**
 * データセット内の駅を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.
 */
type NoName2 = number
/**
 * データセット内の駅と路線を一意に区別する値. 駅コードや路線コードとは異なり、別バージョンのデータセット間でも一貫性を保証します（駅メモ実装における「同じ」駅・路線のIDは異なるデータセットでも同じIDになります）.
 */
type ID = string
/**
 * 駅メモに実装されているのと同じ名称です. データセット内で重複はありません. 重複防止の接尾語が付加される場合があります.
 */
type NoName3 = string
/**
 * 原則として各鉄道会社が示すままの駅名と同じ値です. nameとは異なり重複防止の接尾語を含みません.
 */
type NoName4 = string
/**
 * 駅メモに実装されているのと同じ名称です. ひらがな以外に一部記号を含む場合があります.
 */
type NoName5 = string
/**
 * true: 廃駅, false: 現役駅 'main'データセットの一部では省略されます. 'undefined'の場合はfalseとして扱います.
 */
type NoName6 = boolean
/**
 * １０進小数で表記した緯度（小数点以下６桁）
 */
type NoName7 = number
/**
 * １０進小数で表記した経度（小数点以下６桁）
 */
type NoName8 = number
/**
 * 駅が所在する都道府県を表します.都道府県コードの値は全国地方公共団体コード（JIS X 0401）に従います.
 */
type NoName9 = number
/**
 * 路線コードのリストで表現されます.各駅は必ずひとつ以上の路線に属するため、空のリストは許可しません.
 */
type NoName10 = [NoName11, ...NoName11[]]
/**
 * データセット内の路線を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.
 */
type NoName11 = number
/**
 * 駅メモで定義された各駅の属性値. 廃駅の場合は'unknown'. 駅メモに実装されていない独自廃駅の場合は'undefined'.
 */
type NoName12 = "eco" | "heat" | "cool" | "unknown"
/**
 * 駅データ.jp由来の値、もしくは駅の緯度・軽度をGoogle Geocoding APIで自動検索した最も近い地点を指します.
 */
type NoName13 = string
/**
 * 駅データ.jp由来の値、もしくは駅の緯度・軽度をGoogle Geocoding APIで自動検索した最も近い地点を指します. データソースの違いにより住所表現の粒度が異なる場合があります.
 */
type NoName14 = string
/**
 * 一部の駅のみ定義されます.
 */
type NoName15 = string
/**
 * 廃駅の一部の駅のみ定義されます. 現役駅の場合は定義されません.
 */
type NoName16 = string
type GeometryPolygonLineString = GeometryPolygon | GeometryLineString
/**
 * ボロノイ範囲は中空のないポリゴンのため、長さ１のリスト
 */
type Polygon = [Polygon0]
/**
 * 始点と終点の座標が一致します
 */
type Polygon0 = [NoName18, NoName18, NoName18, ...NoName18[]]
/**
 * 緯度・経度の組み合わせで座標を表します. リストの長さは２で固定で、経度・緯度の順番です.
 */
type NoName18 = [NoName19, NoName20]
type NoName19 = number
type NoName20 = number
type LineString = [NoName21, NoName21, ...NoName21[]]
/**
 * 緯度・経度の組み合わせで座標を表します. リストの長さは２で固定で、経度・緯度の順番です.
 */
type NoName21 = [NoName22, NoName23]
type NoName22 = number
type NoName23 = number
/**
 * false: 駅メモに登録されています. true: 独自追加された廃駅・廃線です(extraデータセットのみ). mainデータセットの一部ではこの属性は未定義（undefined）です.
 */
type NoName24 = boolean
/**
 * ドロネー分割による隣接駅の駅IDのリスト
 */
type NoName25 = string[]
/**
 * すべての駅を含みます
 */
export type StationArray = Station[]

/**
 * 駅の情報
 */
export interface Station {
    code: NoName2
    id: ID
    name: NoName3
    original_name: NoName4
    name_kana: NoName5
    closed: NoName6
    lat: NoName7
    lng: NoName8
    prefecture: NoName9
    lines: NoName10
    attr?: NoName12
    postal_code: NoName13
    address: NoName14
    open_date?: NoName15
    closed_date?: NoName16
    voronoi: NoName17
    extra?: NoName24
    delaunay?: NoName25
}
/**
 * 原則としてポリゴンで表現されます. ただし外周部の一部駅のボロノイ範囲は閉じていないため、ポリライン(LineString)で表現されます. JSONによる図形の表現方法は[GeoJSON](https://geojson.org/geojson-spec.html)に従います.
 */
interface NoName17 {
    type: "Feature"
    geometry: GeometryPolygonLineString
    properties: Feature
}
interface GeometryPolygon {
    type: "Polygon"
    coordinates: Polygon
}
interface GeometryLineString {
    type: "LineString"
    coordinates: LineString
}
/**
 * 空のオブジェクトです
 */
interface Feature {
    [k: string]: unknown
}
