import { ComplexObject } from './Types';
import { getParams } from './mps/parseMPS';
import { knownTechniques } from './mps/techniques';

/**
 * Parse MPS file and MPT header
 */

/** At the moment it seems this is the
 * easiest way to get some compatibility between
 * the two parsers (binary and text)
 * basically, this is a conversion of the keys
 * already included in the MPR parser
 * The ones not included, are returned as they are
 * in the text file
 */
function mapToMPRSettingsNames(name: string) {
  switch (name.toLowerCase()) {
    case 'technique':
      return 'technique';
    case 'acquisition started on':
      return 'acquisitionStart';
    case 'technique started on':
      return 'techniqueStart';
    case 'cycle definition':
      return 'cycleDefinition';
    case 'e transferred':
      return 'eTransferred';
    case 'electrode material':
      return 'electrodeMaterial';
    case 'electrolyte':
      return 'electrolyte';
    case 'electrode surface area':
      return 'electrodeSurfaceArea';
    case 'referece electrode':
      return 'referenceElectrode';
    case 'electrode connection':
      return 'electrodeConnection';
    case 'characteristic mass':
      return 'characteristicMass';
    case 'active material mass':
      return 'activeMaterialMass';
    case 'equivalent weight':
      return 'equivalentWeight';
    case 'battery capacity':
      return 'batteryCapacity';
    case 'battery capacity unit':
      return 'batteryCapacityUnit';
    case 'molecular weight':
      return 'molecularWeight';
    case 'atomic weight':
      return 'atomicWeight';
    case 'initial state':
      return 'initialState';
    case 'filename':
      return 'fileName';
    case 'device':
      return 'device';
    case 'cable':
      return 'cable';
    case 'channel':
      return 'channel';
    case 'comments':
      return 'comments';
    case 'density':
      return 'density';
    case 'user':
      return 'user';
    default:
      return name;
  }
}

/**
 * Parses MPS or MPT's header,
 * @param lines - string array to be parsed,
 * @returns parsed data as a JSON Object.
 */
export function parseMeta(lines: string[]): ComplexObject {
  /* main object */
  let result: ComplexObject = { misc: [] };

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
      const key: string = mapToMPRSettingsNames(kV[0].trim());
      let val = '';

      /* length is normally 2, it may be larger */
      val = kV.length > 2 ? kV.slice(1).join(' : ').trim() : kV[1].trim();

      /* Special key parsing */
      if (key === 'technique') {
        const techniqueName = lines[i++].trim();
        const [params, knownTechnique, lastLineRead] = getParams(
          techniqueName,
          lines,
          i,
          knownTechniques,
        );
        if (params && knownTechnique) {
          result.params = params;
          result.technique = techniqueName;
        } else {
          result.misc = [
            { params: params || '', technique: techniqueName },
            ...result.misc,
          ];
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
