import { ensureString } from 'ensure-string';

export async function parseMPS(file: File) {
  const content = await file.arrayBuffer();
  const lines = ensureString(content, { encoding: 'latin1' }).split(/\r?\n/);
  console.log(content);
}
