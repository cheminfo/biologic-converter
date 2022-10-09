import { IOBuffer } from 'iobuffer';

export interface ParseLogs {
  oleTimestamp: number;
  filename: string;
  host: string;
  address: string;
  ecLabVersion: string;
  serverVersion: string;
  interpreterVersion: string;
  deviceSerial: string;
  averagingPoints: number;
  eweControlRange: {min:number, max:number};
  channel:{number:number, serial:number}
}
/*
 * Most files have logs, this parses logs
 * buffer - IOBuffer
 * @returns the header as a JSON-like object
 *    filename
 *    eweControlRange
 */

export function parseLogs(buffer: IOBuffer): ParseLogs {
  const object: Partial<ParseLogs> = {};
  const zero = buffer.offset;
  buffer.offset = zero + 0x9;
  const channelNumber = buffer.readUint8();
  buffer.offset = zero + 0xab;
  const channelSerial = buffer.readUint16();
  buffer.offset = zero + 0x1f8;
  object.channel = {number:channelNumber, serial:channelSerial}
  const eweControlMin = buffer.readFloat32();
  const eweControlMax = buffer.readFloat32();
  object.eweControlRange = {min:eweControlMin, max:eweControlMax}//is it always same units (V) ?
  buffer.offset = zero + 0x249;
  object.oleTimestamp = buffer.readFloat64();
  object.filename = buffer.decodeText(buffer.readUint8(), 'windows-1252');
  buffer.offset = zero + 0x351;
  object.host = buffer.decodeText(buffer.readUint8(), 'windows-1252');
  buffer.offset = zero + 0x384;
  object.address = buffer.decodeText(buffer.readUint8(), 'windows-1252');
  buffer.offset = zero + 0x3b7;
  object.ecLabVersion = buffer.decodeText(buffer.readUint8(), 'windows-1252');
  buffer.offset = zero + 0x3be;
  object.serverVersion = buffer.decodeText(buffer.readUint8(), 'windows-1252');
  object.interpreterVersion = buffer.decodeText(
    buffer.readUint8(),
    'windows-1252',
  );
  buffer.offset = zero + 0x3c5;
  buffer.offset = zero + 0x3cf;
  object.deviceSerial = buffer.decodeText(buffer.readUint8(), 'windows-1252');
  buffer.offset = zero + 0x922;
  object.averagingPoints = buffer.readUint8();
  return object as ParseLogs;
}
