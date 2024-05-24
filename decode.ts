import { decode } from 'https://deno.land/x/msgpack@v1.4/mod.ts'

const data = Deno.readFileSync('station_database.msgpack')
Deno.writeTextFileSync('station_database.json', JSON.stringify(decode(data), null, 4))