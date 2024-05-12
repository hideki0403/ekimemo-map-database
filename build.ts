import { join } from 'https://deno.land/std@0.224.0/path/mod.ts'
import { encode } from "https://deno.land/x/msgpack@v1.4/mod.ts";

const rootPath = './station_database/out/main'

try {
    Deno.statSync(rootPath)
} catch {
    console.error('station_database not found')
    Deno.exit(1)
}

function readJson<T>(path: string) {
    const p = join(rootPath, path)

    try {
        const data = Deno.readTextFileSync(p)
        return JSON.parse(data) as T
    } catch {
        return null
    }
}

const line: Record<string, any>[] = []

for (const item of readJson<Record<string, string>[]>('line.json') ?? []) {
    const lineData = readJson<Record<string, any>>(`line/${item.code}.json`)!
    const polylineData = readJson<Record<string, any>>(`polyline/${item.code}.json`)

    if (!polylineData) console.warn(`warn: polyline ${item.code} not found`)

    lineData['polyline_list'] = polylineData
    lineData['station_list'] = lineData['station_list'].map((x: Record<string, string>) => x.id)

    line.push(lineData)
}

Deno.writeFileSync('station_database.msgpack', encode({
    station: readJson('station.json'),
    tree: readJson('tree.json'),
    line
}))
