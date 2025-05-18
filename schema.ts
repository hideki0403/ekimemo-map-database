import { FromSchema } from 'npm:json-schema-to-ts@3.1.1'

// Schema from https://github.com/Seo-4d696b75/station_database/tree/main/out/main/schema

export const delaunaySchema = {
    "type": "array",
    "title": "隣接点リスト",
    "description": "ドロネー分割による隣接点（駅座標）を各駅ごとに定義します.",
    "items": {
        "type": "object",
        "title": "駅オブジェクト(隣接点)",
        "description": "ドロネー分割による隣接点（駅座標）を定義",
        "properties": {
            "code": {
                "type": "integer",
                "minimum": 100000,
                "maximum": 9999999,
                "title": "駅コード",
                "description": "データセット内の駅を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.",
                "examples": [
                    1110101,
                    100409
                ]
            },
            "name": {
                "type": "string",
                "minLength": 1,
                "title": "駅・路線の名前",
                "description": "駅メモに実装されているのと同じ名称です. データセット内で重複はありません. 重複防止の接尾語が付加される場合があります.",
                "examples": [
                    "函館",
                    "福島(福島)",
                    "JR函館本線(函館～長万部)"
                ]
            },
            "lat": {
                "type": "number",
                "exclusiveMinimum": 26,
                "exclusiveMaximum": 45.8,
                "title": "駅座標（緯度）",
                "description": "１０進小数で表記した緯度（小数点以下６桁）",
                "examples": [
                    41.773709,
                    37.754123
                ]
            },
            "lng": {
                "type": "number",
                "exclusiveMinimum": 127.5,
                "exclusiveMaximum": 146.2,
                "title": "駅座標（経度）",
                "description": "１０進小数で表記した経度（小数点以下６桁）",
                "examples": [
                    140.726413,
                    140.45968
                ]
            },
            "next": {
                "type": "array",
                "title": "隣接駅コードリスト",
                "description": "隣接駅の駅コードを要素に持ちます.",
                "items": {
                    "type": "integer",
                    "minimum": 100000,
                    "maximum": 9999999,
                    "title": "駅コード",
                    "description": "データセット内の駅を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.",
                    "examples": [
                        1110101,
                        100409
                    ]
                },
                "minItems": 1,
                "uniqueItems": true,
                "examples": [
                    [
                        9910514,
                        1110102,
                        9910518,
                        9910622,
                        9910621,
                        9910515,
                        9910623,
                        9910517
                    ]
                ]
            }
        },
        "required": [
            "code",
            "name",
            "lat",
            "lng",
            "next"
        ],
        "additionalProperties": false
    }
} as const

export type Delaunay = FromSchema<typeof delaunaySchema>

export const lineDetailSchema = {
    "type": "object",
    "title": "路線詳細オブジェクト",
    "properties": {
        "code": {
            "type": "integer",
            "minimum": 1000,
            "maximum": 99999,
            "title": "路線コード",
            "description": "データセット内の路線を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません."
        },
        "id": {
            "type": "integer",
            "minimum": 1,
            "title": "路線ID",
            "description": "路線の識別子. 路線コードとは異なり、別バージョンのデータセット間でも一貫性を保証します（駅メモ実装における「同じ」路線のIDは異なるデータセットでも同じIDになります）. IDは駅メモ公式Webサイトの「駅の思い出」ページのURL https://ekimemo.com/database/line/{id} に対応しています. 独自追加の廃線のIDは2000番台の連番を使用しています.",
            "examples": [
                1,
                2
            ]
        },
        "name": {
            "type": "string",
            "minLength": 1,
            "title": "駅・路線の名前",
            "description": "駅メモに実装されているのと同じ名称です. データセット内で重複はありません. 重複防止の接尾語が付加される場合があります.",
            "examples": [
                "函館",
                "福島(福島)",
                "JR函館本線(函館～長万部)"
            ]
        },
        "name_kana": {
            "type": "string",
            "pattern": "^[\\p{sc=Hiragana}ー・\\p{gc=P}\\s]+$",
            "title": "駅・路線の名前のかな表現",
            "description": "駅メモに実装されているのと同じ名称です. ひらがな以外に一部記号を含む場合があります.",
            "examples": [
                "はこだて",
                "ふくしま",
                "じぇいあーるはこだてほんせん"
            ]
        },
        "name_formal": {
            "type": "string",
            "nullable": true,
            "minLength": 1,
            "title": "路線の正式名称",
            "description": "nameと一致する場合はundefined",
            "examples": [
                "JR東北本線"
            ]
        },
        "station_size": {
            "type": "integer",
            "minimum": 1,
            "title": "登録駅数",
            "description": "かならず１駅以上登録があります",
            "examples": [
                3,
                24
            ]
        },
        "company_code": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "title": "事業者コード"
        },
        "closed": {
            "type": "boolean",
            "title": "廃線フラグ",
            "description": "廃線の場合はtrue"
        },
        "color": {
            "type": "string",
            "nullable": true,
            "pattern": "^#[0-9A-F]{6}$",
            "title": "路線カラー",
            "description": "RGBチャネル16進数",
            "examples": [
                "#F68B1E"
            ]
        },
        "symbol": {
            "type": "string",
            "nullable": true,
            "minLength": 1,
            "title": "路線記号",
            "examples": [
                "JU"
            ]
        },
        "station_list": {
            "type": "array",
            "minItems": 1,
            "items": {
                "type": "object",
                "title": "駅オブジェクト(路線登録)",
                "properties": {
                    "code": {
                        "type": "integer",
                        "minimum": 100000,
                        "maximum": 9999999,
                        "title": "駅コード",
                        "description": "データセット内の駅を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.",
                        "examples": [
                            1110101,
                            100409
                        ]
                    },
                    "id": {
                        "type": "integer",
                        "minimum": 1,
                        "title": "駅ID",
                        "description": "駅の識別子. 駅コードとは異なり、別バージョンのデータセット間でも一貫性を保証します（駅メモ実装における「同じ」駅のIDは異なるデータセットでも同じIDになります）. IDは駅メモ公式Webサイトの「駅の思い出」ページのURL https://ekimemo.com/database/station/{id}/activity に対応しています. 独自追加の廃駅のIDは20000番台の連番を使用しています.",
                        "examples": [
                            1,
                            2
                        ]
                    },
                    "name": {
                        "type": "string",
                        "minLength": 1,
                        "title": "駅・路線の名前",
                        "description": "駅メモに実装されているのと同じ名称です. データセット内で重複はありません. 重複防止の接尾語が付加される場合があります.",
                        "examples": [
                            "函館",
                            "福島(福島)",
                            "JR函館本線(函館～長万部)"
                        ]
                    },
                    "original_name": {
                        "type": "string",
                        "minLength": 1,
                        "title": "オリジナルの駅名称",
                        "description": "原則として各鉄道会社が示すままの駅名と同じ値です. nameとは異なり重複防止の接尾語を含みません.",
                        "examples": [
                            "函館",
                            "福島"
                        ]
                    },
                    "name_kana": {
                        "type": "string",
                        "pattern": "^[\\p{sc=Hiragana}ー・\\p{gc=P}\\s]+$",
                        "title": "駅・路線の名前のかな表現",
                        "description": "駅メモに実装されているのと同じ名称です. ひらがな以外に一部記号を含む場合があります.",
                        "examples": [
                            "はこだて",
                            "ふくしま",
                            "じぇいあーるはこだてほんせん"
                        ]
                    },
                    "closed": {
                        "type": "boolean",
                        "nullable": true,
                        "title": "廃駅フラグ",
                        "description": "true: 廃駅, false: 現役駅 'main'データセットの一部では省略されます. 'undefined'の場合はfalseとして扱います."
                    },
                    "lat": {
                        "type": "number",
                        "exclusiveMinimum": 26,
                        "exclusiveMaximum": 45.8,
                        "title": "駅座標（緯度）",
                        "description": "１０進小数で表記した緯度（小数点以下６桁）",
                        "examples": [
                            41.773709,
                            37.754123
                        ]
                    },
                    "lng": {
                        "type": "number",
                        "exclusiveMinimum": 127.5,
                        "exclusiveMaximum": 146.2,
                        "title": "駅座標（経度）",
                        "description": "１０進小数で表記した経度（小数点以下６桁）",
                        "examples": [
                            140.726413,
                            140.45968
                        ]
                    },
                    "prefecture": {
                        "type": "integer",
                        "minimum": 1,
                        "maximum": 47,
                        "title": "都道府県コード",
                        "description": "駅が所在する都道府県を表します.都道府県コードの値は全国地方公共団体コード（JIS X 0401）に従います."
                    },
                    "numbering": {
                        "type": "array",
                        "nullable": true,
                        "minItems": 1,
                        "uniqueItems": true,
                        "items": {
                            "type": "string",
                            "minLength": 1
                        },
                        "title": "駅ナンバリング",
                        "description": "各路線における駅のナンバリング",
                        "examples": [
                            [
                                "H75"
                            ]
                        ]
                    },
                    "lines": {
                        "type": "array",
                        "items": {
                            "type": "integer",
                            "minimum": 1000,
                            "maximum": 99999,
                            "title": "路線コード",
                            "description": "データセット内の路線を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません."
                        },
                        "minItems": 1,
                        "uniqueItems": true,
                        "title": "駅が登録されている路線",
                        "description": "路線コードのリストで表現されます.各駅は必ずひとつ以上の路線に属するため、空のリストは許可しません.",
                        "examples": [
                            [
                                11101,
                                11119
                            ],
                            [
                                1004,
                                11231,
                                11216,
                                99213,
                                99215
                            ]
                        ]
                    },
                    "attr": {
                        "type": "string",
                        "title": "駅の属性",
                        "description": "駅メモで定義された各駅の属性値. 廃駅の場合は'unknown'.",
                        "enum": [
                            "eco",
                            "heat",
                            "cool",
                            "unknown"
                        ]
                    },
                    "postal_code": {
                        "type": "string",
                        "pattern": "^[0-9]{3}-[0-9]{4}$",
                        "title": "駅の所在地を表す郵便番号",
                        "description": "駅データ.jp由来の値、もしくは駅の緯度・軽度をGoogle Geocoding APIで自動検索した最も近い地点を指します.",
                        "examples": [
                            "040-0063",
                            "960-8031"
                        ]
                    },
                    "address": {
                        "type": "string",
                        "minLength": 1,
                        "title": "駅の所在地の住所",
                        "description": "駅データ.jp由来の値、もしくは駅の緯度・軽度をGoogle Geocoding APIで自動検索した最も近い地点を指します. データソースの違いにより住所表現の粒度が異なる場合があります.",
                        "examples": [
                            "北海道函館市若松町１２-１３",
                            "福島市栄町"
                        ]
                    },
                    "open_date": {
                        "type": "string",
                        "nullable": true,
                        "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
                        "title": "駅の開業日",
                        "description": "一部の駅のみ定義されます.",
                        "examples": [
                            "1902-12-10"
                        ]
                    },
                    "closed_date": {
                        "type": "string",
                        "nullable": true,
                        "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
                        "title": "駅の廃止日",
                        "description": "廃駅の一部の駅のみ定義されます. 現役駅の場合は定義されません.",
                        "examples": [
                            "2022-03-12"
                        ]
                    },
                    "voronoi": {
                        "type": "object",
                        "title": "ボロノイ範囲",
                        "description": "原則としてポリゴンで表現されます. ただし外周部の一部駅のボロノイ範囲は閉じていないため、ポリライン(LineString)で表現されます. JSONによる図形の表現方法は[GeoJSON](https://geojson.org/geojson-spec.html)に従います.",
                        "examples": [
                            {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Polygon",
                                    "coordinates": [
                                        [
                                            [
                                                140.72591,
                                                41.771256
                                            ],
                                            [
                                                140.717527,
                                                41.773829
                                            ],
                                            [
                                                140.71735,
                                                41.774204
                                            ],
                                            [
                                                140.714999,
                                                41.785757
                                            ],
                                            [
                                                140.714787,
                                                41.792259
                                            ],
                                            [
                                                140.72972,
                                                41.788694
                                            ],
                                            [
                                                140.730562,
                                                41.78452
                                            ],
                                            [
                                                140.731074,
                                                41.778908
                                            ],
                                            [
                                                140.72591,
                                                41.771256
                                            ]
                                        ]
                                    ]
                                },
                                "properties": {}
                            }
                        ],
                        "properties": {
                            "type": {
                                "type": "string",
                                "const": "Feature"
                            },
                            "geometry": {
                                "type": "object",
                                "title": "geometry(Polygon/LineString)",
                                "required": [
                                    "type",
                                    "coordinates"
                                ],
                                "oneOf": [
                                    {
                                        "type": "object",
                                        "title": "geometry(Polygon)",
                                        "examples": [
                                            {
                                                "type": "Polygon",
                                                "coordinates": [
                                                    [
                                                        [
                                                            140.72591,
                                                            41.771256
                                                        ],
                                                        [
                                                            140.717527,
                                                            41.773829
                                                        ],
                                                        [
                                                            140.71735,
                                                            41.774204
                                                        ],
                                                        [
                                                            140.714999,
                                                            41.785757
                                                        ],
                                                        [
                                                            140.714787,
                                                            41.792259
                                                        ],
                                                        [
                                                            140.72972,
                                                            41.788694
                                                        ],
                                                        [
                                                            140.730562,
                                                            41.78452
                                                        ],
                                                        [
                                                            140.731074,
                                                            41.778908
                                                        ],
                                                        [
                                                            140.72591,
                                                            41.771256
                                                        ]
                                                    ]
                                                ]
                                            }
                                        ],
                                        "properties": {
                                            "type": {
                                                "type": "string",
                                                "const": "Polygon"
                                            },
                                            "coordinates": {
                                                "type": "array",
                                                "title": "Polygonの座標リスト",
                                                "description": "ボロノイ範囲は中空のないポリゴンのため、長さ１のリスト",
                                                "examples": [
                                                    [
                                                        [
                                                            [
                                                                140.72591,
                                                                41.771256
                                                            ],
                                                            [
                                                                140.717527,
                                                                41.773829
                                                            ],
                                                            [
                                                                140.71735,
                                                                41.774204
                                                            ],
                                                            [
                                                                140.714999,
                                                                41.785757
                                                            ],
                                                            [
                                                                140.714787,
                                                                41.792259
                                                            ],
                                                            [
                                                                140.72972,
                                                                41.788694
                                                            ],
                                                            [
                                                                140.730562,
                                                                41.78452
                                                            ],
                                                            [
                                                                140.731074,
                                                                41.778908
                                                            ],
                                                            [
                                                                140.72591,
                                                                41.771256
                                                            ]
                                                        ]
                                                    ]
                                                ],
                                                "minItems": 1,
                                                "maxItems": 1,
                                                "items": {
                                                    "type": "array",
                                                    "minItems": 3,
                                                    "items": {
                                                        "type": "array",
                                                        "minItems": 2,
                                                        "maxItems": 2,
                                                        "items": [
                                                            {
                                                                "type": "number",
                                                                "minimum": 112,
                                                                "maximum": 160,
                                                                "title": "経度"
                                                            },
                                                            {
                                                                "type": "number",
                                                                "minimum": 20,
                                                                "maximum": 60,
                                                                "title": "緯度"
                                                            }
                                                        ],
                                                        "title": "座標点",
                                                        "description": "緯度・経度の組み合わせで座標を表します. リストの長さは２で固定で、経度・緯度の順番です.",
                                                        "examples": [
                                                            [
                                                                140.731677,
                                                                41.776316
                                                            ]
                                                        ]
                                                    },
                                                    "title": "Polygonの座標リスト[0]",
                                                    "description": "始点と終点の座標が一致します"
                                                }
                                            }
                                        },
                                        "required": [
                                            "type",
                                            "coordinates"
                                        ],
                                        "additionalProperties": false
                                    },
                                    {
                                        "type": "object",
                                        "title": "geometry(LineString)",
                                        "examples": [
                                            {
                                                "type": "LineString",
                                                "coordinates": [
                                                    [
                                                        160,
                                                        32.2175
                                                    ],
                                                    [
                                                        145.486252,
                                                        43.24743
                                                    ],
                                                    [
                                                        145.480118,
                                                        43.249398
                                                    ],
                                                    [
                                                        145.412432,
                                                        42.926476
                                                    ],
                                                    [
                                                        145.393203,
                                                        42.31716
                                                    ],
                                                    [
                                                        145.394284,
                                                        42.306034
                                                    ],
                                                    [
                                                        145.479425,
                                                        41.700239
                                                    ],
                                                    [
                                                        146.005674,
                                                        39.188776
                                                    ],
                                                    [
                                                        149.514356,
                                                        35.886453
                                                    ],
                                                    [
                                                        150.83862,
                                                        34.697293
                                                    ],
                                                    [
                                                        151.547974,
                                                        34.255494
                                                    ],
                                                    [
                                                        160,
                                                        29.000091
                                                    ]
                                                ]
                                            }
                                        ],
                                        "properties": {
                                            "type": {
                                                "type": "string",
                                                "const": "LineString"
                                            },
                                            "coordinates": {
                                                "type": "array",
                                                "title": "LineStringの座標リスト",
                                                "minItems": 2,
                                                "items": {
                                                    "type": "array",
                                                    "minItems": 2,
                                                    "maxItems": 2,
                                                    "items": [
                                                        {
                                                            "type": "number",
                                                            "minimum": 112,
                                                            "maximum": 160,
                                                            "title": "経度"
                                                        },
                                                        {
                                                            "type": "number",
                                                            "minimum": 20,
                                                            "maximum": 60,
                                                            "title": "緯度"
                                                        }
                                                    ],
                                                    "title": "座標点",
                                                    "description": "緯度・経度の組み合わせで座標を表します. リストの長さは２で固定で、経度・緯度の順番です.",
                                                    "examples": [
                                                        [
                                                            140.731677,
                                                            41.776316
                                                        ]
                                                    ]
                                                },
                                                "examples": [
                                                    [
                                                        [
                                                            160,
                                                            32.2175
                                                        ],
                                                        [
                                                            145.486252,
                                                            43.24743
                                                        ],
                                                        [
                                                            145.480118,
                                                            43.249398
                                                        ],
                                                        [
                                                            145.412432,
                                                            42.926476
                                                        ],
                                                        [
                                                            145.393203,
                                                            42.31716
                                                        ],
                                                        [
                                                            145.394284,
                                                            42.306034
                                                        ],
                                                        [
                                                            145.479425,
                                                            41.700239
                                                        ],
                                                        [
                                                            146.005674,
                                                            39.188776
                                                        ],
                                                        [
                                                            149.514356,
                                                            35.886453
                                                        ],
                                                        [
                                                            150.83862,
                                                            34.697293
                                                        ],
                                                        [
                                                            151.547974,
                                                            34.255494
                                                        ],
                                                        [
                                                            160,
                                                            29.000091
                                                        ]
                                                    ]
                                                ]
                                            }
                                        },
                                        "required": [
                                            "type",
                                            "coordinates"
                                        ],
                                        "additionalProperties": false
                                    }
                                ]
                            },
                            "properties": {
                                "type": "object",
                                "title": "Featureのプロパティ",
                                "description": "空のオブジェクトです",
                                "const": {}
                            }
                        },
                        "required": [
                            "type",
                            "geometry",
                            "properties"
                        ],
                        "additionalProperties": false
                    }
                },
                "required": [
                    "code",
                    "id",
                    "name",
                    "original_name",
                    "name_kana",
                    "closed",
                    "lat",
                    "lng",
                    "prefecture",
                    "lines",
                    "attr",
                    "postal_code",
                    "address",
                    "voronoi"
                ],
                "additionalProperties": false
            },
            "title": "登録駅リスト",
            "description": "原則として駅メモ実装と同じ順序です"
        },
        "closed_date": {
            "type": "string",
            "nullable": true,
            "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
            "title": "路線の廃止日",
            "description": "廃線の一部のみ定義されます. 現役駅の場合は定義されません.",
            "examples": [
                "2015-03-14"
            ]
        }
    },
    "required": [
        "code",
        "id",
        "name",
        "name_kana",
        "station_size",
        "closed",
        "station_list"
    ],
    "additionalProperties": false
} as const

export type LineDetail = FromSchema<typeof lineDetailSchema>

export const lineSchema = {
    "type": "array",
    "items": {
        "type": "object",
        "title": "路線オブジェクト",
        "examples": [
            {
                "code": 11319,
                "id": "2d2b3a",
                "name": "JR東北本線(宇都宮線)",
                "name_kana": "じぇいあーるとうほくほんせん",
                "name_formal": "JR東北本線",
                "station_size": 33,
                "company_code": 2,
                "closed": false,
                "color": "#F68B1E",
                "symbol": "JU"
            }
        ],
        "properties": {
            "code": {
                "type": "integer",
                "minimum": 1000,
                "maximum": 99999,
                "title": "路線コード",
                "description": "データセット内の路線を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません."
            },
            "id": {
                "type": "integer",
                "minimum": 1,
                "title": "路線ID",
                "description": "路線の識別子. 路線コードとは異なり、別バージョンのデータセット間でも一貫性を保証します（駅メモ実装における「同じ」路線のIDは異なるデータセットでも同じIDになります）. IDは駅メモ公式Webサイトの「駅の思い出」ページのURL https://ekimemo.com/database/line/{id} に対応しています. 独自追加の廃線のIDは2000番台の連番を使用しています.",
                "examples": [
                    1,
                    2
                ]
            },
            "name": {
                "type": "string",
                "minLength": 1,
                "title": "駅・路線の名前",
                "description": "駅メモに実装されているのと同じ名称です. データセット内で重複はありません. 重複防止の接尾語が付加される場合があります.",
                "examples": [
                    "函館",
                    "福島(福島)",
                    "JR函館本線(函館～長万部)"
                ]
            },
            "name_kana": {
                "type": "string",
                "pattern": "^[\\p{sc=Hiragana}ー・\\p{gc=P}\\s]+$",
                "title": "駅・路線の名前のかな表現",
                "description": "駅メモに実装されているのと同じ名称です. ひらがな以外に一部記号を含む場合があります.",
                "examples": [
                    "はこだて",
                    "ふくしま",
                    "じぇいあーるはこだてほんせん"
                ]
            },
            "name_formal": {
                "type": "string",
                "nullable": true,
                "minLength": 1,
                "title": "路線の正式名称",
                "description": "nameと一致する場合はundefined",
                "examples": [
                    "JR東北本線"
                ]
            },
            "station_size": {
                "type": "integer",
                "minimum": 1,
                "title": "登録駅数",
                "description": "かならず１駅以上登録があります",
                "examples": [
                    3,
                    24
                ]
            },
            "company_code": {
                "type": "integer",
                "nullable": true,
                "minimum": 0,
                "title": "事業者コード"
            },
            "closed": {
                "type": "boolean",
                "title": "廃線フラグ",
                "description": "廃線の場合はtrue"
            },
            "color": {
                "type": "string",
                "nullable": true,
                "pattern": "^#[0-9A-F]{6}$",
                "title": "路線カラー",
                "description": "RGBチャネル16進数",
                "examples": [
                    "#F68B1E"
                ]
            },
            "symbol": {
                "type": "string",
                "nullable": true,
                "minLength": 1,
                "title": "路線記号",
                "examples": [
                    "JU"
                ]
            },
            "closed_date": {
                "type": "string",
                "nullable": true,
                "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
                "title": "路線の廃止日",
                "description": "廃線の一部のみ定義されます. 現役駅の場合は定義されません.",
                "examples": [
                    "2015-03-14"
                ]
            }
        },
        "required": [
            "code",
            "id",
            "name",
            "name_kana",
            "station_size",
            "closed"
        ],
        "additionalProperties": false
    },
    "title": "路線リスト",
    "description": "すべての路線を含むリスト"
} as const

export type Line = FromSchema<typeof lineSchema>

export const polylineSchema = {
    "type": "object",
    "title": "路線ポリライン",
    "description": "Feature(LineString)で表現されるポリラインの集合FeatureCollectionです. フォーマットの詳細はGeoJSONに従います.",
    "properties": {
        "type": {
            "type": "string",
            "const": "FeatureCollection"
        },
        "features": {
            "type": "array",
            "minItems": 1,
            "items": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "const": "Feature"
                    },
                    "geometry": {
                        "type": "object",
                        "properties": {
                            "type": {
                                "type": "string",
                                "const": "LineString"
                            },
                            "coordinates": {
                                "type": "array",
                                "minItems": 2,
                                "items": {
                                    "type": "array",
                                    "minItems": 2,
                                    "maxItems": 2,
                                    "items": [
                                        {
                                            "type": "number",
                                            "minimum": 112,
                                            "maximum": 160,
                                            "title": "経度"
                                        },
                                        {
                                            "type": "number",
                                            "minimum": 20,
                                            "maximum": 60,
                                            "title": "緯度"
                                        }
                                    ],
                                    "title": "座標点",
                                    "description": "緯度・経度の組み合わせで座標を表します. リストの長さは２で固定で、経度・緯度の順番です.",
                                    "examples": [
                                        [
                                            140.731677,
                                            41.776316
                                        ]
                                    ]
                                }
                            }
                        },
                        "required": [
                            "type",
                            "coordinates"
                        ],
                        "additionalProperties": false
                    },
                    "properties": {
                        "type": "object",
                        "properties": {
                            "start": {
                                "type": "string",
                                "minLength": 1,
                                "title": "ポリライン始点の識別子",
                                "description": "同じ識別子をもつポイライン末端との接続を表現します"
                            },
                            "end": {
                                "type": "string",
                                "minLength": 1,
                                "title": "ポリライン終点の識別子",
                                "description": "同じ識別子をもつポイライン始端との接続を表現します"
                            }
                        },
                        "required": [
                            "start",
                            "end"
                        ],
                        "additionalProperties": false
                    }
                },
                "required": [
                    "type",
                    "geometry",
                    "properties"
                ],
                "additionalProperties": false
            }
        },
        "properties": {
            "type": "object",
            "title": "路線ポリライン付加情報",
            "description": "north, south, east, westでポイライン全体の範囲を示します.",
            "properties": {
                "name": {
                    "type": "string",
                    "minLength": 1,
                    "title": "路線名"
                },
                "north": {
                    "type": "number"
                },
                "south": {
                    "type": "number"
                },
                "east": {
                    "type": "number"
                },
                "west": {
                    "type": "number"
                }
            },
            "required": [
                "name",
                "north",
                "south",
                "east",
                "west"
            ],
            "additionalProperties": false
        }
    },
    "required": [
        "type",
        "features",
        "properties"
    ],
    "additionalProperties": false
} as const

export type Polyline = FromSchema<typeof polylineSchema>

export const stationSchema = {
    "type": "array",
    "items": {
        "title": "駅オブジェクト",
        "description": "駅の情報",
        "type": "object",
        "examples": [
            {
                "code": 100409,
                "id": "7bfd6b",
                "name": "福島(福島)",
                "original_name": "福島",
                "name_kana": "ふくしま",
                "closed": false,
                "lat": 37.754123,
                "lng": 140.45968,
                "prefecture": 7,
                "lines": [
                    1004,
                    11231,
                    11216,
                    99213,
                    99215
                ],
                "attr": "heat",
                "postal_code": "960-8031",
                "address": "福島市栄町",
                "voronoi": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [
                                    140.436325,
                                    37.741446
                                ],
                                [
                                    140.441067,
                                    37.754985
                                ],
                                [
                                    140.446198,
                                    37.756742
                                ],
                                [
                                    140.501679,
                                    37.758667
                                ],
                                [
                                    140.510809,
                                    37.752683
                                ],
                                [
                                    140.527108,
                                    37.739585
                                ],
                                [
                                    140.534984,
                                    37.729765
                                ],
                                [
                                    140.436325,
                                    37.741446
                                ]
                            ]
                        ]
                    },
                    "properties": {}
                }
            }
        ],
        "properties": {
            "code": {
                "type": "integer",
                "minimum": 100000,
                "maximum": 9999999,
                "title": "駅コード",
                "description": "データセット内の駅を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.",
                "examples": [
                    1110101,
                    100409
                ]
            },
            "id": {
                "type": "integer",
                "minimum": 1,
                "title": "駅ID",
                "description": "駅の識別子. 駅コードとは異なり、別バージョンのデータセット間でも一貫性を保証します（駅メモ実装における「同じ」駅のIDは異なるデータセットでも同じIDになります）. IDは駅メモ公式Webサイトの「駅の思い出」ページのURL https://ekimemo.com/database/station/{id}/activity に対応しています. 独自追加の廃駅のIDは20000番台の連番を使用しています.",
                "examples": [
                    1,
                    2
                ]
            },
            "name": {
                "type": "string",
                "minLength": 1,
                "title": "駅・路線の名前",
                "description": "駅メモに実装されているのと同じ名称です. データセット内で重複はありません. 重複防止の接尾語が付加される場合があります.",
                "examples": [
                    "函館",
                    "福島(福島)",
                    "JR函館本線(函館～長万部)"
                ]
            },
            "original_name": {
                "type": "string",
                "minLength": 1,
                "title": "オリジナルの駅名称",
                "description": "原則として各鉄道会社が示すままの駅名と同じ値です. nameとは異なり重複防止の接尾語を含みません.",
                "examples": [
                    "函館",
                    "福島"
                ]
            },
            "name_kana": {
                "type": "string",
                "pattern": "^[\\p{sc=Hiragana}ー・\\p{gc=P}\\s]+$",
                "title": "駅・路線の名前のかな表現",
                "description": "駅メモに実装されているのと同じ名称です. ひらがな以外に一部記号を含む場合があります.",
                "examples": [
                    "はこだて",
                    "ふくしま",
                    "じぇいあーるはこだてほんせん"
                ]
            },
            "closed": {
                "type": "boolean",
                "nullable": true,
                "title": "廃駅フラグ",
                "description": "true: 廃駅, false: 現役駅 'main'データセットの一部では省略されます. 'undefined'の場合はfalseとして扱います."
            },
            "lat": {
                "type": "number",
                "exclusiveMinimum": 26,
                "exclusiveMaximum": 45.8,
                "title": "駅座標（緯度）",
                "description": "１０進小数で表記した緯度（小数点以下６桁）",
                "examples": [
                    41.773709,
                    37.754123
                ]
            },
            "lng": {
                "type": "number",
                "exclusiveMinimum": 127.5,
                "exclusiveMaximum": 146.2,
                "title": "駅座標（経度）",
                "description": "１０進小数で表記した経度（小数点以下６桁）",
                "examples": [
                    140.726413,
                    140.45968
                ]
            },
            "prefecture": {
                "type": "integer",
                "minimum": 1,
                "maximum": 47,
                "title": "都道府県コード",
                "description": "駅が所在する都道府県を表します.都道府県コードの値は全国地方公共団体コード（JIS X 0401）に従います."
            },
            "lines": {
                "type": "array",
                "items": {
                    "type": "integer",
                    "minimum": 1000,
                    "maximum": 99999,
                    "title": "路線コード",
                    "description": "データセット内の路線を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません."
                },
                "minItems": 1,
                "uniqueItems": true,
                "title": "駅が登録されている路線",
                "description": "路線コードのリストで表現されます.各駅は必ずひとつ以上の路線に属するため、空のリストは許可しません.",
                "examples": [
                    [
                        11101,
                        11119
                    ],
                    [
                        1004,
                        11231,
                        11216,
                        99213,
                        99215
                    ]
                ]
            },
            "attr": {
                "type": "string",
                "title": "駅の属性",
                "description": "駅メモで定義された各駅の属性値. 廃駅の場合は'unknown'.",
                "enum": [
                    "eco",
                    "heat",
                    "cool",
                    "unknown"
                ]
            },
            "postal_code": {
                "type": "string",
                "pattern": "^[0-9]{3}-[0-9]{4}$",
                "title": "駅の所在地を表す郵便番号",
                "description": "駅データ.jp由来の値、もしくは駅の緯度・軽度をGoogle Geocoding APIで自動検索した最も近い地点を指します.",
                "examples": [
                    "040-0063",
                    "960-8031"
                ]
            },
            "address": {
                "type": "string",
                "minLength": 1,
                "title": "駅の所在地の住所",
                "description": "駅データ.jp由来の値、もしくは駅の緯度・軽度をGoogle Geocoding APIで自動検索した最も近い地点を指します. データソースの違いにより住所表現の粒度が異なる場合があります.",
                "examples": [
                    "北海道函館市若松町１２-１３",
                    "福島市栄町"
                ]
            },
            "open_date": {
                "type": "string",
                "nullable": true,
                "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
                "title": "駅の開業日",
                "description": "一部の駅のみ定義されます.",
                "examples": [
                    "1902-12-10"
                ]
            },
            "closed_date": {
                "type": "string",
                "nullable": true,
                "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
                "title": "駅の廃止日",
                "description": "廃駅の一部の駅のみ定義されます. 現役駅の場合は定義されません.",
                "examples": [
                    "2022-03-12"
                ]
            },
            "voronoi": {
                "type": "object",
                "title": "ボロノイ範囲",
                "description": "原則としてポリゴンで表現されます. ただし外周部の一部駅のボロノイ範囲は閉じていないため、ポリライン(LineString)で表現されます. JSONによる図形の表現方法は[GeoJSON](https://geojson.org/geojson-spec.html)に従います.",
                "examples": [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [
                                    [
                                        140.72591,
                                        41.771256
                                    ],
                                    [
                                        140.717527,
                                        41.773829
                                    ],
                                    [
                                        140.71735,
                                        41.774204
                                    ],
                                    [
                                        140.714999,
                                        41.785757
                                    ],
                                    [
                                        140.714787,
                                        41.792259
                                    ],
                                    [
                                        140.72972,
                                        41.788694
                                    ],
                                    [
                                        140.730562,
                                        41.78452
                                    ],
                                    [
                                        140.731074,
                                        41.778908
                                    ],
                                    [
                                        140.72591,
                                        41.771256
                                    ]
                                ]
                            ]
                        },
                        "properties": {}
                    }
                ],
                "properties": {
                    "type": {
                        "type": "string",
                        "const": "Feature"
                    },
                    "geometry": {
                        "type": "object",
                        "title": "geometry(Polygon/LineString)",
                        "required": [
                            "type",
                            "coordinates"
                        ],
                        "oneOf": [
                            {
                                "type": "object",
                                "title": "geometry(Polygon)",
                                "examples": [
                                    {
                                        "type": "Polygon",
                                        "coordinates": [
                                            [
                                                [
                                                    140.72591,
                                                    41.771256
                                                ],
                                                [
                                                    140.717527,
                                                    41.773829
                                                ],
                                                [
                                                    140.71735,
                                                    41.774204
                                                ],
                                                [
                                                    140.714999,
                                                    41.785757
                                                ],
                                                [
                                                    140.714787,
                                                    41.792259
                                                ],
                                                [
                                                    140.72972,
                                                    41.788694
                                                ],
                                                [
                                                    140.730562,
                                                    41.78452
                                                ],
                                                [
                                                    140.731074,
                                                    41.778908
                                                ],
                                                [
                                                    140.72591,
                                                    41.771256
                                                ]
                                            ]
                                        ]
                                    }
                                ],
                                "properties": {
                                    "type": {
                                        "type": "string",
                                        "const": "Polygon"
                                    },
                                    "coordinates": {
                                        "type": "array",
                                        "title": "Polygonの座標リスト",
                                        "description": "ボロノイ範囲は中空のないポリゴンのため、長さ１のリスト",
                                        "examples": [
                                            [
                                                [
                                                    [
                                                        140.72591,
                                                        41.771256
                                                    ],
                                                    [
                                                        140.717527,
                                                        41.773829
                                                    ],
                                                    [
                                                        140.71735,
                                                        41.774204
                                                    ],
                                                    [
                                                        140.714999,
                                                        41.785757
                                                    ],
                                                    [
                                                        140.714787,
                                                        41.792259
                                                    ],
                                                    [
                                                        140.72972,
                                                        41.788694
                                                    ],
                                                    [
                                                        140.730562,
                                                        41.78452
                                                    ],
                                                    [
                                                        140.731074,
                                                        41.778908
                                                    ],
                                                    [
                                                        140.72591,
                                                        41.771256
                                                    ]
                                                ]
                                            ]
                                        ],
                                        "minItems": 1,
                                        "maxItems": 1,
                                        "items": {
                                            "type": "array",
                                            "minItems": 3,
                                            "items": {
                                                "type": "array",
                                                "minItems": 2,
                                                "maxItems": 2,
                                                "items": [
                                                    {
                                                        "type": "number",
                                                        "minimum": 112,
                                                        "maximum": 160,
                                                        "title": "経度"
                                                    },
                                                    {
                                                        "type": "number",
                                                        "minimum": 20,
                                                        "maximum": 60,
                                                        "title": "緯度"
                                                    }
                                                ],
                                                "title": "座標点",
                                                "description": "緯度・経度の組み合わせで座標を表します. リストの長さは２で固定で、経度・緯度の順番です.",
                                                "examples": [
                                                    [
                                                        140.731677,
                                                        41.776316
                                                    ]
                                                ]
                                            },
                                            "title": "Polygonの座標リスト[0]",
                                            "description": "始点と終点の座標が一致します"
                                        }
                                    }
                                },
                                "required": [
                                    "type",
                                    "coordinates"
                                ],
                                "additionalProperties": false
                            },
                            {
                                "type": "object",
                                "title": "geometry(LineString)",
                                "examples": [
                                    {
                                        "type": "LineString",
                                        "coordinates": [
                                            [
                                                160,
                                                32.2175
                                            ],
                                            [
                                                145.486252,
                                                43.24743
                                            ],
                                            [
                                                145.480118,
                                                43.249398
                                            ],
                                            [
                                                145.412432,
                                                42.926476
                                            ],
                                            [
                                                145.393203,
                                                42.31716
                                            ],
                                            [
                                                145.394284,
                                                42.306034
                                            ],
                                            [
                                                145.479425,
                                                41.700239
                                            ],
                                            [
                                                146.005674,
                                                39.188776
                                            ],
                                            [
                                                149.514356,
                                                35.886453
                                            ],
                                            [
                                                150.83862,
                                                34.697293
                                            ],
                                            [
                                                151.547974,
                                                34.255494
                                            ],
                                            [
                                                160,
                                                29.000091
                                            ]
                                        ]
                                    }
                                ],
                                "properties": {
                                    "type": {
                                        "type": "string",
                                        "const": "LineString"
                                    },
                                    "coordinates": {
                                        "type": "array",
                                        "title": "LineStringの座標リスト",
                                        "minItems": 2,
                                        "items": {
                                            "type": "array",
                                            "minItems": 2,
                                            "maxItems": 2,
                                            "items": [
                                                {
                                                    "type": "number",
                                                    "minimum": 112,
                                                    "maximum": 160,
                                                    "title": "経度"
                                                },
                                                {
                                                    "type": "number",
                                                    "minimum": 20,
                                                    "maximum": 60,
                                                    "title": "緯度"
                                                }
                                            ],
                                            "title": "座標点",
                                            "description": "緯度・経度の組み合わせで座標を表します. リストの長さは２で固定で、経度・緯度の順番です.",
                                            "examples": [
                                                [
                                                    140.731677,
                                                    41.776316
                                                ]
                                            ]
                                        },
                                        "examples": [
                                            [
                                                [
                                                    160,
                                                    32.2175
                                                ],
                                                [
                                                    145.486252,
                                                    43.24743
                                                ],
                                                [
                                                    145.480118,
                                                    43.249398
                                                ],
                                                [
                                                    145.412432,
                                                    42.926476
                                                ],
                                                [
                                                    145.393203,
                                                    42.31716
                                                ],
                                                [
                                                    145.394284,
                                                    42.306034
                                                ],
                                                [
                                                    145.479425,
                                                    41.700239
                                                ],
                                                [
                                                    146.005674,
                                                    39.188776
                                                ],
                                                [
                                                    149.514356,
                                                    35.886453
                                                ],
                                                [
                                                    150.83862,
                                                    34.697293
                                                ],
                                                [
                                                    151.547974,
                                                    34.255494
                                                ],
                                                [
                                                    160,
                                                    29.000091
                                                ]
                                            ]
                                        ]
                                    }
                                },
                                "required": [
                                    "type",
                                    "coordinates"
                                ],
                                "additionalProperties": false
                            }
                        ]
                    },
                    "properties": {
                        "type": "object",
                        "title": "Featureのプロパティ",
                        "description": "空のオブジェクトです",
                        "const": {}
                    }
                },
                "required": [
                    "type",
                    "geometry",
                    "properties"
                ],
                "additionalProperties": false
            }
        },
        "required": [
            "code",
            "id",
            "name",
            "original_name",
            "name_kana",
            "closed",
            "lat",
            "lng",
            "prefecture",
            "lines",
            "attr",
            "postal_code",
            "address",
            "voronoi"
        ],
        "additionalProperties": false
    },
    "title": "駅リスト",
    "description": "すべての駅を含みます"
} as const

export type StationArray = FromSchema<typeof stationSchema>
export type Station = StationArray[number]

export const treeSegmentSchema = {
    "type": "object",
    "title": "探索部分木",
    "description": "駅を座標点から探索するためのデータ構造(kd-tree)の部分木",
    "properties": {
        "name": {
            "type": "string",
            "minLength": 1,
            "title": "部分木の名前",
            "description": "部分木の名前はファイル名と一致します ${name}.json"
        },
        "root": {
            "type": "integer",
            "title": "ルート駅コード",
            "description": "部分木のルートに位置する頂点の駅コード. node_listに該当する頂点（駅）が必ず含まれます."
        },
        "node_list": {
            "type": "array",
            "minItems": 1,
            "items": {
                "type": "object",
                "title": "探索部分木の頂点",
                "description": "駅の座標点を頂点として扱います. left, rightで下に続く子頂点を表します.",
                "properties": {
                    "code": {
                        "type": "integer",
                        "minimum": 100000,
                        "maximum": 9999999,
                        "title": "駅コード",
                        "description": "データセット内の駅を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません.",
                        "examples": [
                            1110101,
                            100409
                        ]
                    },
                    "id": {
                        "type": "integer",
                        "minimum": 1,
                        "title": "駅ID",
                        "description": "駅の識別子. 駅コードとは異なり、別バージョンのデータセット間でも一貫性を保証します（駅メモ実装における「同じ」駅のIDは異なるデータセットでも同じIDになります）. IDは駅メモ公式Webサイトの「駅の思い出」ページのURL https://ekimemo.com/database/station/{id}/activity に対応しています. 独自追加の廃駅のIDは20000番台の連番を使用しています.",
                        "examples": [
                            1,
                            2
                        ]
                    },
                    "name": {
                        "type": "string",
                        "minLength": 1,
                        "title": "駅・路線の名前",
                        "description": "駅メモに実装されているのと同じ名称です. データセット内で重複はありません. 重複防止の接尾語が付加される場合があります.",
                        "examples": [
                            "函館",
                            "福島(福島)",
                            "JR函館本線(函館～長万部)"
                        ]
                    },
                    "original_name": {
                        "type": "string",
                        "minLength": 1,
                        "title": "オリジナルの駅名称",
                        "description": "原則として各鉄道会社が示すままの駅名と同じ値です. nameとは異なり重複防止の接尾語を含みません.",
                        "examples": [
                            "函館",
                            "福島"
                        ]
                    },
                    "name_kana": {
                        "type": "string",
                        "pattern": "^[\\p{sc=Hiragana}ー・\\p{gc=P}\\s]+$",
                        "title": "駅・路線の名前のかな表現",
                        "description": "駅メモに実装されているのと同じ名称です. ひらがな以外に一部記号を含む場合があります.",
                        "examples": [
                            "はこだて",
                            "ふくしま",
                            "じぇいあーるはこだてほんせん"
                        ]
                    },
                    "closed": {
                        "type": "boolean",
                        "nullable": true,
                        "title": "廃駅フラグ",
                        "description": "true: 廃駅, false: 現役駅 'main'データセットの一部では省略されます. 'undefined'の場合はfalseとして扱います."
                    },
                    "lat": {
                        "type": "number",
                        "exclusiveMinimum": 26,
                        "exclusiveMaximum": 45.8,
                        "title": "駅座標（緯度）",
                        "description": "１０進小数で表記した緯度（小数点以下６桁）",
                        "examples": [
                            41.773709,
                            37.754123
                        ]
                    },
                    "lng": {
                        "type": "number",
                        "exclusiveMinimum": 127.5,
                        "exclusiveMaximum": 146.2,
                        "title": "駅座標（経度）",
                        "description": "１０進小数で表記した経度（小数点以下６桁）",
                        "examples": [
                            140.726413,
                            140.45968
                        ]
                    },
                    "left": {
                        "type": "integer",
                        "minimum": 100000,
                        "maximum": 9999999,
                        "title": "子頂点の駅コード(left)",
                        "description": "緯度または経度の値がこの駅の座標より小さい頂点の駅コード",
                        "examples": [
                            1110101,
                            100409
                        ],
                        "nullable": true
                    },
                    "right": {
                        "type": "integer",
                        "minimum": 100000,
                        "maximum": 9999999,
                        "title": "子頂点の駅コード(right)",
                        "description": "緯度または経度の値がこの駅の座標より大きい頂点の駅コード",
                        "examples": [
                            1110101,
                            100409
                        ],
                        "nullable": true
                    },
                    "segment": {
                        "type": "string",
                        "minLength": 1,
                        "nullable": true,
                        "title": "部分木の名前",
                        "description": "segmentが定義されている場合、指定された名前の部分木がこの頂点の下に続きます."
                    },
                    "prefecture": {
                        "type": "integer",
                        "minimum": 1,
                        "maximum": 47,
                        "title": "都道府県コード",
                        "description": "駅が所在する都道府県を表します.都道府県コードの値は全国地方公共団体コード（JIS X 0401）に従います."
                    },
                    "lines": {
                        "type": "array",
                        "items": {
                            "type": "integer",
                            "minimum": 1000,
                            "maximum": 99999,
                            "title": "路線コード",
                            "description": "データセット内の路線を一意に区別する値. 駅・路線IDとは異なり、別バージョンのデータセット間では一貫性を保証しません."
                        },
                        "minItems": 1,
                        "uniqueItems": true,
                        "title": "駅が登録されている路線",
                        "description": "路線コードのリストで表現されます.各駅は必ずひとつ以上の路線に属するため、空のリストは許可しません.",
                        "examples": [
                            [
                                11101,
                                11119
                            ],
                            [
                                1004,
                                11231,
                                11216,
                                99213,
                                99215
                            ]
                        ]
                    },
                    "attr": {
                        "type": "string",
                        "title": "駅の属性",
                        "description": "駅メモで定義された各駅の属性値. 廃駅の場合は'unknown'.",
                        "enum": [
                            "eco",
                            "heat",
                            "cool",
                            "unknown"
                        ]
                    },
                    "postal_code": {
                        "type": "string",
                        "pattern": "^[0-9]{3}-[0-9]{4}$",
                        "title": "駅の所在地を表す郵便番号",
                        "description": "駅データ.jp由来の値、もしくは駅の緯度・軽度をGoogle Geocoding APIで自動検索した最も近い地点を指します.",
                        "examples": [
                            "040-0063",
                            "960-8031"
                        ]
                    },
                    "address": {
                        "type": "string",
                        "minLength": 1,
                        "title": "駅の所在地の住所",
                        "description": "駅データ.jp由来の値、もしくは駅の緯度・軽度をGoogle Geocoding APIで自動検索した最も近い地点を指します. データソースの違いにより住所表現の粒度が異なる場合があります.",
                        "examples": [
                            "北海道函館市若松町１２-１３",
                            "福島市栄町"
                        ]
                    },
                    "open_date": {
                        "type": "string",
                        "nullable": true,
                        "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
                        "title": "駅の開業日",
                        "description": "一部の駅のみ定義されます.",
                        "examples": [
                            "1902-12-10"
                        ]
                    },
                    "closed_date": {
                        "type": "string",
                        "nullable": true,
                        "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
                        "title": "駅の廃止日",
                        "description": "廃駅の一部の駅のみ定義されます. 現役駅の場合は定義されません.",
                        "examples": [
                            "2022-03-12"
                        ]
                    },
                    "voronoi": {
                        "type": "object",
                        "title": "ボロノイ範囲",
                        "description": "原則としてポリゴンで表現されます. ただし外周部の一部駅のボロノイ範囲は閉じていないため、ポリライン(LineString)で表現されます. JSONによる図形の表現方法は[GeoJSON](https://geojson.org/geojson-spec.html)に従います.",
                        "examples": [
                            {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Polygon",
                                    "coordinates": [
                                        [
                                            [
                                                140.72591,
                                                41.771256
                                            ],
                                            [
                                                140.717527,
                                                41.773829
                                            ],
                                            [
                                                140.71735,
                                                41.774204
                                            ],
                                            [
                                                140.714999,
                                                41.785757
                                            ],
                                            [
                                                140.714787,
                                                41.792259
                                            ],
                                            [
                                                140.72972,
                                                41.788694
                                            ],
                                            [
                                                140.730562,
                                                41.78452
                                            ],
                                            [
                                                140.731074,
                                                41.778908
                                            ],
                                            [
                                                140.72591,
                                                41.771256
                                            ]
                                        ]
                                    ]
                                },
                                "properties": {}
                            }
                        ],
                        "properties": {
                            "type": {
                                "type": "string",
                                "const": "Feature"
                            },
                            "geometry": {
                                "type": "object",
                                "title": "geometry(Polygon/LineString)",
                                "required": [
                                    "type",
                                    "coordinates"
                                ],
                                "oneOf": [
                                    {
                                        "type": "object",
                                        "title": "geometry(Polygon)",
                                        "examples": [
                                            {
                                                "type": "Polygon",
                                                "coordinates": [
                                                    [
                                                        [
                                                            140.72591,
                                                            41.771256
                                                        ],
                                                        [
                                                            140.717527,
                                                            41.773829
                                                        ],
                                                        [
                                                            140.71735,
                                                            41.774204
                                                        ],
                                                        [
                                                            140.714999,
                                                            41.785757
                                                        ],
                                                        [
                                                            140.714787,
                                                            41.792259
                                                        ],
                                                        [
                                                            140.72972,
                                                            41.788694
                                                        ],
                                                        [
                                                            140.730562,
                                                            41.78452
                                                        ],
                                                        [
                                                            140.731074,
                                                            41.778908
                                                        ],
                                                        [
                                                            140.72591,
                                                            41.771256
                                                        ]
                                                    ]
                                                ]
                                            }
                                        ],
                                        "properties": {
                                            "type": {
                                                "type": "string",
                                                "const": "Polygon"
                                            },
                                            "coordinates": {
                                                "type": "array",
                                                "title": "Polygonの座標リスト",
                                                "description": "ボロノイ範囲は中空のないポリゴンのため、長さ１のリスト",
                                                "examples": [
                                                    [
                                                        [
                                                            [
                                                                140.72591,
                                                                41.771256
                                                            ],
                                                            [
                                                                140.717527,
                                                                41.773829
                                                            ],
                                                            [
                                                                140.71735,
                                                                41.774204
                                                            ],
                                                            [
                                                                140.714999,
                                                                41.785757
                                                            ],
                                                            [
                                                                140.714787,
                                                                41.792259
                                                            ],
                                                            [
                                                                140.72972,
                                                                41.788694
                                                            ],
                                                            [
                                                                140.730562,
                                                                41.78452
                                                            ],
                                                            [
                                                                140.731074,
                                                                41.778908
                                                            ],
                                                            [
                                                                140.72591,
                                                                41.771256
                                                            ]
                                                        ]
                                                    ]
                                                ],
                                                "minItems": 1,
                                                "maxItems": 1,
                                                "items": {
                                                    "type": "array",
                                                    "minItems": 3,
                                                    "items": {
                                                        "type": "array",
                                                        "minItems": 2,
                                                        "maxItems": 2,
                                                        "items": [
                                                            {
                                                                "type": "number",
                                                                "minimum": 112,
                                                                "maximum": 160,
                                                                "title": "経度"
                                                            },
                                                            {
                                                                "type": "number",
                                                                "minimum": 20,
                                                                "maximum": 60,
                                                                "title": "緯度"
                                                            }
                                                        ],
                                                        "title": "座標点",
                                                        "description": "緯度・経度の組み合わせで座標を表します. リストの長さは２で固定で、経度・緯度の順番です.",
                                                        "examples": [
                                                            [
                                                                140.731677,
                                                                41.776316
                                                            ]
                                                        ]
                                                    },
                                                    "title": "Polygonの座標リスト[0]",
                                                    "description": "始点と終点の座標が一致します"
                                                }
                                            }
                                        },
                                        "required": [
                                            "type",
                                            "coordinates"
                                        ],
                                        "additionalProperties": false
                                    },
                                    {
                                        "type": "object",
                                        "title": "geometry(LineString)",
                                        "examples": [
                                            {
                                                "type": "LineString",
                                                "coordinates": [
                                                    [
                                                        160,
                                                        32.2175
                                                    ],
                                                    [
                                                        145.486252,
                                                        43.24743
                                                    ],
                                                    [
                                                        145.480118,
                                                        43.249398
                                                    ],
                                                    [
                                                        145.412432,
                                                        42.926476
                                                    ],
                                                    [
                                                        145.393203,
                                                        42.31716
                                                    ],
                                                    [
                                                        145.394284,
                                                        42.306034
                                                    ],
                                                    [
                                                        145.479425,
                                                        41.700239
                                                    ],
                                                    [
                                                        146.005674,
                                                        39.188776
                                                    ],
                                                    [
                                                        149.514356,
                                                        35.886453
                                                    ],
                                                    [
                                                        150.83862,
                                                        34.697293
                                                    ],
                                                    [
                                                        151.547974,
                                                        34.255494
                                                    ],
                                                    [
                                                        160,
                                                        29.000091
                                                    ]
                                                ]
                                            }
                                        ],
                                        "properties": {
                                            "type": {
                                                "type": "string",
                                                "const": "LineString"
                                            },
                                            "coordinates": {
                                                "type": "array",
                                                "title": "LineStringの座標リスト",
                                                "minItems": 2,
                                                "items": {
                                                    "type": "array",
                                                    "minItems": 2,
                                                    "maxItems": 2,
                                                    "items": [
                                                        {
                                                            "type": "number",
                                                            "minimum": 112,
                                                            "maximum": 160,
                                                            "title": "経度"
                                                        },
                                                        {
                                                            "type": "number",
                                                            "minimum": 20,
                                                            "maximum": 60,
                                                            "title": "緯度"
                                                        }
                                                    ],
                                                    "title": "座標点",
                                                    "description": "緯度・経度の組み合わせで座標を表します. リストの長さは２で固定で、経度・緯度の順番です.",
                                                    "examples": [
                                                        [
                                                            140.731677,
                                                            41.776316
                                                        ]
                                                    ]
                                                },
                                                "examples": [
                                                    [
                                                        [
                                                            160,
                                                            32.2175
                                                        ],
                                                        [
                                                            145.486252,
                                                            43.24743
                                                        ],
                                                        [
                                                            145.480118,
                                                            43.249398
                                                        ],
                                                        [
                                                            145.412432,
                                                            42.926476
                                                        ],
                                                        [
                                                            145.393203,
                                                            42.31716
                                                        ],
                                                        [
                                                            145.394284,
                                                            42.306034
                                                        ],
                                                        [
                                                            145.479425,
                                                            41.700239
                                                        ],
                                                        [
                                                            146.005674,
                                                            39.188776
                                                        ],
                                                        [
                                                            149.514356,
                                                            35.886453
                                                        ],
                                                        [
                                                            150.83862,
                                                            34.697293
                                                        ],
                                                        [
                                                            151.547974,
                                                            34.255494
                                                        ],
                                                        [
                                                            160,
                                                            29.000091
                                                        ]
                                                    ]
                                                ]
                                            }
                                        },
                                        "required": [
                                            "type",
                                            "coordinates"
                                        ],
                                        "additionalProperties": false
                                    }
                                ]
                            },
                            "properties": {
                                "type": "object",
                                "title": "Featureのプロパティ",
                                "description": "空のオブジェクトです",
                                "const": {}
                            }
                        },
                        "required": [
                            "type",
                            "geometry",
                            "properties"
                        ],
                        "additionalProperties": false
                    }
                },
                "required": [
                    "code",
                    "id",
                    "name",
                    "original_name",
                    "name_kana",
                    "closed",
                    "lat",
                    "lng",
                    "prefecture",
                    "lines",
                    "attr",
                    "postal_code",
                    "address",
                    "voronoi"
                ],
                "additionalProperties": false
            },
            "title": "頂点リスト",
            "description": "部分木を構成する頂点（駅）のリスト"
        }
    },
    "required": [
        "name",
        "root",
        "node_list"
    ],
    "additionalProperties": false
} as const

export type TreeSegment = FromSchema<typeof treeSegmentSchema>