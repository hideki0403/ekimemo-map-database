import { decode } from 'jsr:@std/msgpack'

const data = Deno.readFileSync('station_database.msgpack')
Deno.writeTextFileSync('station_database.json', JSON.stringify(decode(data), null, 4))