/**
 * データセット内の路線を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.
 */
type Code = number
/**
 * データセット内の駅と路線を一意に区別する値. 駅コードや路線コードとは異なり、別バージョンのデータセット間でも一貫性を保証します（駅メモ実装における「同じ」駅・路線のIDは異なるデータセットでも同じIDになります）.
 */
type Id = string
/**
 * 駅メモに実装されているのと同じ名称です. データセット内で重複はありません. 重複防止の接尾語が付加される場合があります.
 */
type Name = string
/**
 * 駅メモに実装されているのと同じ名称です. ひらがな以外に一部記号を含む場合があります.
 */
type NameKana = string
/**
 * nameと一致する場合はundefined
 */
type NameFormal = string
/**
 * かならず１駅以上登録があります
 */
type StationSize = number
/**
 * 事業者コード
 */
type CompanyCode = number
/**
 * 廃線の場合はtrue
 */
type Closed = boolean
/**
 * RGBチャネル16進数
 */
type Color = string
/**
 * 路線記号
 */
type Symbol = string
/**
 * 廃線の一部のみ定義されます. 現役駅の場合は定義されません.
 */
type ClosedDate = string
/**
 * false: 駅メモに登録されています. true: 独自追加された廃駅・廃線です(extraデータセットのみ). mainデータセットの一部ではこの属性は未定義（undefined）です.
 */
type Extra = boolean
/**
 * すべての路線を含むリスト
 */
export type LineArray = Line[]

export interface Line {
    code: Code
    id: Id
    name: Name
    name_kana: NameKana
    name_formal?: NameFormal
    station_size: StationSize
    company_code?: CompanyCode
    closed: Closed
    color?: Color
    symbol?: Symbol
    closed_date?: ClosedDate
    extra?: Extra
}
