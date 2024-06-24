import './station.d.ts'
import { StationArray } from './station.d.ts';
import { Polyline } from './polyline.d.ts';

/**
 * データセット内の路線を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.
 */
type NoName1 = number
/**
 * データセット内の駅と路線を一意に区別する値. 駅コードや路線コードとは異なり、別バージョンのデータセット間でも一貫性を保証します（駅メモ実装における「同じ」駅・路線のIDは異なるデータセットでも同じIDになります）.
 */
type ID = string
/**
 * 駅メモに実装されているのと同じ名称です. データセット内で重複はありません. 重複防止の接尾語が付加される場合があります.
 */
type NoName2 = string
/**
 * 駅メモに実装されているのと同じ名称です. ひらがな以外に一部記号を含む場合があります.
 */
type NoName3 = string
/**
 * nameと一致する場合はundefined
 */
type NoName4 = string
/**
 * かならず１駅以上登録があります
 */
type NoName5 = number
type NoName6 = number
/**
 * 廃線の場合はtrue
 */
type NoName7 = boolean
/**
 * RGBチャネル16進数
 */
type NoName8 = string
type NoName9 = string
/**
 * 廃線の一部のみ定義されます. 現役駅の場合は定義されません.
 */
type NoName10 = string
/**
 * false: 駅メモに登録されています. true: 独自追加された廃駅・廃線です(extraデータセットのみ). mainデータセットの一部ではこの属性は未定義（undefined）です.
 */
type NoName11 = boolean
/**
 * 原則として駅メモ実装と同じ順序です
 */
type NoName12 = string[]
/**
 * データセット内の駅を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.
 */
type NoName14 = number
/**
 * データセット内の駅と路線を一意に区別する値. 駅コードや路線コードとは異なり、別バージョンのデータセット間でも一貫性を保証します（駅メモ実装における「同じ」駅・路線のIDは異なるデータセットでも同じIDになります）.
 */
type ID1 = string
/**
 * 駅メモに実装されているのと同じ名称です. データセット内で重複はありません. 重複防止の接尾語が付加される場合があります.
 */
type NoName15 = string
/**
 * 原則として各鉄道会社が示すままの駅名と同じ値です. nameとは異なり重複防止の接尾語を含みません.
 */
type NoName16 = string
/**
 * 駅メモに実装されているのと同じ名称です. ひらがな以外に一部記号を含む場合があります.
 */
type NoName17 = string
/**
 * true: 廃駅, false: 現役駅 'main'データセットの一部では省略されます. 'undefined'の場合はfalseとして扱います.
 */
type NoName18 = boolean
/**
 * １０進小数で表記した緯度（小数点以下６桁）
 */
type NoName19 = number
/**
 * １０進小数で表記した経度（小数点以下６桁）
 */
type NoName20 = number
/**
 * 駅が所在する都道府県を表します.都道府県コードの値は全国地方公共団体コード（JIS X 0401）に従います.
 */
type NoName21 = number
/**
 * 路線コードのリストで表現されます.各駅は必ずひとつ以上の路線に属するため、空のリストは許可しません.
 */
type NoName22 = [NoName23, ...NoName23[]]
/**
 * データセット内の路線を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.
 */
type NoName23 = number
/**
 * 駅メモで定義された各駅の属性値. 廃駅の場合は'unknown'. 駅メモに実装されていない独自廃駅の場合は'undefined'.
 */
type NoName24 = "eco" | "heat" | "cool" | "unknown"
/**
 * 駅データ.jp由来の値、もしくは駅の緯度・軽度をGoogle Geocoding APIで自動検索した最も近い地点を指します.
 */
type NoName25 = string
/**
 * 駅データ.jp由来の値、もしくは駅の緯度・軽度をGoogle Geocoding APIで自動検索した最も近い地点を指します. データソースの違いにより住所表現の粒度が異なる場合があります.
 */
type NoName26 = string
/**
 * 一部の駅のみ定義されます.
 */
type NoName27 = string
/**
 * 廃駅の一部の駅のみ定義されます. 現役駅の場合は定義されません.
 */
type NoName28 = string
type GeometryPolygonLineString = GeometryPolygon | GeometryLineString
/**
 * ボロノイ範囲は中空のないポリゴンのため、長さ１のリスト
 */
type Polygon = [Polygon0]
/**
 * 始点と終点の座標が一致します
 */
type Polygon0 = [NoName30, NoName30, NoName30, ...NoName30[]]
/**
 * 緯度・経度の組み合わせで座標を表します. リストの長さは２で固定で、経度・緯度の順番です.
 */
type NoName30 = [NoName31, NoName32]
type NoName31 = number
type NoName32 = number
type LineString = [NoName33, NoName33, ...NoName33[]]
/**
 * 緯度・経度の組み合わせで座標を表します. リストの長さは２で固定で、経度・緯度の順番です.
 */
type NoName33 = [NoName34, NoName35]
type NoName34 = number
type NoName35 = number
/**
 * false: 駅メモに登録されています. true: 独自追加された廃駅・廃線です(extraデータセットのみ). mainデータセットの一部ではこの属性は未定義（undefined）です.
 */
type NoName36 = boolean
/**
 * 各路線における駅のナンバリング
 */
type NoName37 = [string, ...string[]]

interface LineDetail {
    code: NoName1
    id: ID
    name: NoName2
    name_kana: NoName3
    name_formal?: NoName4
    station_size: NoName5
    company_code?: NoName6
    closed: NoName7
    color?: NoName8
    symbol?: NoName9
    closed_date?: NoName10
    extra?: NoName11
    station_list: NoName12
    polyline_list?: Polyline | null
}
/**
 * 原則としてポリゴンで表現されます. ただし外周部の一部駅のボロノイ範囲は閉じていないため、ポリライン(LineString)で表現されます. JSONによる図形の表現方法は[GeoJSON](https://geojson.org/geojson-spec.html)に従います.
 */
interface NoName29 {
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
