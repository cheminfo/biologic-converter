import { TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

export function parseMPS(arrayBuffer: TextData) {
  const lines = ensureString(arrayBuffer, {
    encoding: 'latin1',
  }).split(/\r?\n/);
}
