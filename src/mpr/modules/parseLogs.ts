import { IOBuffer } from 'iobuffer';

export interface ParseLogs {
  channelNumber: number;
  channeSerial: number;
  eweControlMin: number;
  eweControlMax: number;
  oleTimestamp: number;
  filename: string;
  host: string;
  address: string;
  ecLabVersion: string;
  serverVersion: string;
  interpreterVersion: string;
  deviceSerial: string;
  averagingPoints: number;
}
/*
 * Most files have logs, this parses logs
 * buffer - IOBuffer
 * @returns the header as a JSON-like object
 */

export function parseLogs(buffer: IOBuffer): ParseLogs {
  const object: Partial<ParseLogs> = {};
  const zero = buffer.offset;
  buffer.offset = zero + 0x9;
  object.channelNumber = buffer.readUint8();
  buffer.offset = zero + 0xab;
  object.channeSerial = buffer.readUint16();
  buffer.offset = zero + 0x1f8;
  object.eweControlMin = buffer.readFloat32();
  object.eweControlMax = buffer.readFloat32();
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
