import { ComplexObject } from './Types';
import { camalize } from './utility/camalize';
import { getParams } from './utility/getParamsFromText';
/**
 * Parses MPS or MPT's header,
 * @param lines - string array to be parsed,
 * @returns parsed data as a JSON Object.
 */
export function parseMeta(lines: string[]): ComplexObject {
  /* main object */
  let result: ComplexObject = { techniques: [] };

  /* regex for each case */
  const regex = {
    nothing: /^\s*$/,
    keyValue: / : | :$/,
    table: /^\w.*\s{2,}-*\w+.*\s{4,}$/,
    multiline: /^[ \t]/,
  };

  let i = 0; //loop over lines

  for (; i < lines.length; i++) {
    const currentLine = lines[i];

    /* empty line, continue */
    if (regex.nothing.test(currentLine)) {
      continue;
    } else if (regex.keyValue.test(currentLine)) {
      /* key val pairs. Value is single or regex.multiline */

      const kV: string[] = currentLine.split(regex.keyValue); //if many " : " we fix below
      const key: string = camalize(kV[0]);
      let val = '';

      /* length is normally 2, it may be larger */
      val = kV.length > 2 ? kV.slice(1).join(' : ').trim() : kV[1].trim();

      /* Special key parsing */
      if (key === 'technique') {
        const name = lines[++i].trim();
        const [params, lastLineRead] = getParams(lines, ++i);
        if (params) {
          params.technique = name;
          result.techniques.push(params);
        }
        i = lastLineRead;
        continue; //next line
      }

      /* if not special key could be regex.multiline */
      while (regex.multiline.test(lines[i + 1])) {
        val = val.concat('\n', lines[++i].trim());
      }

      result[key] = val;
    } else if (regex.table.test(currentLine)) {
      /* for not k : v */
      //regex.table
      const kV: string[] = currentLine.split(/\s{2,}/);
      const [key, val] = [kV[0].trim(), kV.slice(1).join('  ').trim()];
      result[key] = val;
    } else if (Array.isArray(result.flags)) {
      result.flags.push(currentLine);
    } else {
      result.flags = [currentLine];
    }
  }
  return result;
}
