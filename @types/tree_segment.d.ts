/**
 * 部分木の名前はファイル名と一致します ${name}.json
 */
type NoName1 = string
/**
 * 部分木のルートに位置する頂点の駅コード. node_listに該当する頂点（駅）が必ず含まれます.
 */
type NoName2 = number
/**
 * 部分木を構成する頂点（駅）のリスト
 */
type NoName3 = [NoName4, ...NoName4[]]
/**
 * データセット内の駅を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.
 */
type NoName5 = number
/**
 * データセット内の駅と路線を一意に区別する値. 駅コードや路線コードとは異なり、別バージョンのデータセット間でも一貫性を保証します（駅メモ実装における「同じ」駅・路線のIDは異なるデータセットでも同じIDになります）.
 */
type ID = string
/**
 * 駅メモに実装されているのと同じ名称です. データセット内で重複はありません. 重複防止の接尾語が付加される場合があります.
 */
type NoName6 = string
/**
 * 原則として各鉄道会社が示すままの駅名と同じ値です. nameとは異なり重複防止の接尾語を含みません.
 */
type NoName7 = string
/**
 * 駅メモに実装されているのと同じ名称です. ひらがな以外に一部記号を含む場合があります.
 */
type NoName8 = string
/**
 * true: 廃駅, false: 現役駅 'main'データセットの一部では省略されます. 'undefined'の場合はfalseとして扱います.
 */
type NoName9 = boolean
/**
 * １０進小数で表記した緯度（小数点以下６桁）
 */
type NoName10 = number
/**
 * １０進小数で表記した経度（小数点以下６桁）
 */
type NoName11 = number
/**
 * 駅が所在する都道府県を表します.都道府県コードの値は全国地方公共団体コード（JIS X 0401）に従います.
 */
type NoName12 = number
/**
 * 路線コードのリストで表現されます.各駅は必ずひとつ以上の路線に属するため、空のリストは許可しません.
 */
type NoName13 = [NoName14, ...NoName14[]]
/**
 * データセット内の路線を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.
 */
type NoName14 = number
/**
 * 駅メモで定義された各駅の属性値. 廃駅の場合は'unknown'. 駅メモに実装されていない独自廃駅の場合は'undefined'.
 */
type NoName15 = "eco" | "heat" | "cool" | "unknown"
/**
 * 駅データ.jp由来の値、もしくは駅の緯度・軽度をGoogle Geocoding APIで自動検索した最も近い地点を指します.
 */
type NoName16 = string
/**
 * 駅データ.jp由来の値、もしくは駅の緯度・軽度をGoogle Geocoding APIで自動検索した最も近い地点を指します. データソースの違いにより住所表現の粒度が異なる場合があります.
 */
type NoName17 = string
/**
 * 一部の駅のみ定義されます.
 */
type NoName18 = string
/**
 * 廃駅の一部の駅のみ定義されます. 現役駅の場合は定義されません.
 */
type NoName19 = string
type GeometryPolygonLineString = GeometryPolygon | GeometryLineString
/**
 * ボロノイ範囲は中空のないポリゴンのため、長さ１のリスト
 */
type Polygon = [Polygon0]
/**
 * 始点と終点の座標が一致します
 */
type Polygon0 = [NoName21, NoName21, NoName21, ...NoName21[]]
/**
 * 緯度・経度の組み合わせで座標を表します. リストの長さは２で固定で、経度・緯度の順番です.
 */
type NoName21 = [NoName22, NoName23]
type NoName22 = number
type NoName23 = number
type LineString = [NoName24, NoName24, ...NoName24[]]
/**
 * 緯度・経度の組み合わせで座標を表します. リストの長さは２で固定で、経度・緯度の順番です.
 */
type NoName24 = [NoName25, NoName26]
type NoName25 = number
type NoName26 = number
/**
 * false: 駅メモに登録されています. true: 独自追加された廃駅・廃線です(extraデータセットのみ). mainデータセットの一部ではこの属性は未定義（undefined）です.
 */
type NoName27 = boolean
/**
 * 緯度または経度の値がこの駅の座標より小さい頂点の駅コード
 */
type Left = number
/**
 * 緯度または経度の値がこの駅の座標より大きい頂点の駅コード
 */
type Right = number
/**
 * segmentが定義されている場合、指定された名前の部分木がこの頂点の下に続きます.
 */
type NoName28 = string

/**
 * 駅を座標点から探索するためのデータ構造(kd-tree)の部分木
 */
interface TreeSegment {
    name: NoName1
    root: NoName2
    node_list: NoName3
}
/**
 * 駅の座標点を頂点として扱います. left, rightで下に続く子頂点を表します.
 */
interface NoName4 {
    code: NoName5
    id: ID
    name: NoName6
    original_name: NoName7
    name_kana: NoName8
    closed: NoName9
    lat: NoName10
    lng: NoName11
    prefecture: NoName12
    lines: NoName13
    attr?: NoName15
    postal_code: NoName16
    address: NoName17
    open_date?: NoName18
    closed_date?: NoName19
    voronoi: NoName20
    extra?: NoName27
    left?: Left
    right?: Right
    segment?: NoName28
}
/**
 * 原則としてポリゴンで表現されます. ただし外周部の一部駅のボロノイ範囲は閉じていないため、ポリライン(LineString)で表現されます. JSONによる図形の表現方法は[GeoJSON](https://geojson.org/geojson-spec.html)に従います.
 */
interface NoName20 {
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
