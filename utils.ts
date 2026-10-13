import { join } from 'jsr:@std/path'
import { encode, type ValueType } from 'jsr:@std/msgpack'
import type { FromSchema, JSONSchema } from 'npm:json-schema-to-ts@3.1.1'

type ObjectValueType =
    | number
    | bigint
    | string
    | boolean
    | null
    | Uint8Array
    | readonly ObjectValueType[]
    | ObjectValueMap;

interface ObjectValueMap {
    [index: string | number]: ObjectValueType;
}

const rootPath = './station_database'
const artifactsPath = join(rootPath, 'out/main')

try {
    Deno.statSync(artifactsPath)
} catch {
    console.error('station_database not found')
    Deno.exit(1)
}

export function readJson<T extends JSONSchema, U>(path: string, schema: T, fallback: U, resolveFromRoot?: boolean): FromSchema<T> | U
export function readJson<T extends JSONSchema>(path: string, schema: T, fallback?: undefined, resolveFromRoot?: boolean): FromSchema<T> | null

export function readJson<T extends JSONSchema, U>(path: string, _schema: T, fallback?: U, resolveFromRoot = false): FromSchema<T> | U | null {
    const p = join(resolveFromRoot ? rootPath : artifactsPath, path)

    try {
        const data = Deno.readTextFileSync(p)
        return JSON.parse(data) ?? fallback ?? null
    } catch {
        return fallback ?? null
    }
}

function removeUndefined(obj: ObjectValueMap): ValueType {
    for (const key in obj) {
        if (obj[key] === undefined) {
            obj[key] = null
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            obj[key] = removeUndefined(obj[key] as ObjectValueMap)
        }
    }
    return obj
}

export function encodeMessagePack(data: any): Uint8Array {
    return encode(removeUndefined(data))
}