import { TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { StringObject, ComplexObject } from '../Types';
import { parseMeta } from '../parseMeta';

/** future
column_units = {
    '"Ri"/Ohm': ("'Ri'", "Ω"),
    "-Im(Z)/Ohm": ("-Im(Z)", "Ω"),
    "-Im(Zce)/Ohm": ("-Im(Zce)", "Ω"),
    "-Im(Zwe-ce)/Ohm": ("-Im(Zwe-ce)", "Ω"),
    "(Q-Qo)/C": ("(Q-Qo)", "C"),
    "(Q-Qo)/mA.h": ("(Q-Qo)", "mA·h"),
    "<Ece>/V": ("<Ece>", "V"),
    "<Ewe>/V": ("<Ewe>", "V"),
    "<I>/mA": ("<I>", "mA"),
    "|Ece|/V": ("|Ece|", "V"),
    "|Energy|/W.h": ("|Energy|", "W·h"),
    "|Ewe|/V": ("|Ewe|", "V"),
    "|I|/A": ("|I|", "A"),
    "|Y|/Ohm-1": ("|Y|", "S"),
    "|Z|/Ohm": ("|Z|", "Ω"),
    "|Zce|/Ohm": ("|Zce|", "Ω"),
    "|Zwe-ce|/Ohm": ("|Zwe-ce|", "Ω"),
    "Analog IN 1/V": ("Analog IN 1", "V"),
    "Analog IN 2/V": ("Analog IN 2", "V"),
    "Capacitance charge/µF": ("Capacitance charge", "µF"),
    "Capacitance discharge/µF": ("Capacitance discharge", "µF"),
    "Capacity/mA.h": ("Capacity", "mA·h"),
    "charge time/s": ("charge time", "s"),
    "Conductivity/S.cm-1": ("Conductivity", "S/cm"),
    "control changes": ("control changes", None),
    "control/mA": ("control_I", "mA"),
    "control/V": ("control_V", "V"),
    "control/V/mA": ("control_V/I", "V/mA"),
    "counter inc.": ("counter inc.", None),
    "Cp-2/µF-2": ("Cp⁻²", "µF⁻²"),
    "Cp/µF": ("Cp", "µF"),
    "Cs-2/µF-2": ("Cs⁻²", "µF⁻²"),
    "Cs/µF": ("Cs", "µF"),
    "cycle number": ("cycle number", None),
    "cycle time/s": ("cycle time", "s"),
    "d(Q-Qo)/dE/mA.h/V": ("d(Q-Qo)/dE", "mA·h/V"),
    "dI/dt/mA/s": ("dI/dt", "mA/s"),
    "discharge time/s": ("discharge time", "s"),
    "dQ/C": ("dQ", "C"),
    "dq/mA.h": ("dq", "mA·h"),
    "dQ/mA.h": ("dQ", "mA·h"),
    "Ece/V": ("Ece", "V"),
    "Ecell/V": ("Ecell", "V"),
    "Efficiency/%": ("Efficiency", "%"),
    "Energy charge/W.h": ("Energy charge", "W·h"),
    "Energy discharge/W.h": ("Energy discharge", "W·h"),
    "Energy/W.h": ("Energy", "W·h"),
    "error": ("error", None),
    "Ewe-Ece/V": ("Ewe-Ece", "V"),
    "Ewe/V": ("Ewe", "V"),
    "freq/Hz": ("freq", "Hz"),
    "half cycle": ("half cycle", None),
    "I Range": ("I Range", None),
    "I/mA": ("I", "mA"),
    "Im(Y)/Ohm-1": ("Im(Y)", "S"),
    "mode": ("mode", None),
    "Ns changes": ("Ns changes", None),
    "Ns": ("Ns", None),
    "NSD Ewe/%": ("NSD Ewe", "%"),
    "NSD I/%": ("NSD I", "%"),
    "NSR Ewe/%": ("NSR Ewe", "%"),
    "NSR I/%": ("NSR I", "%"),
    "ox/red": ("ox/red", None),
    "P/W": ("P", "W"),
    "Phase(Y)/deg": ("Phase(Y)", "deg"),
    "Phase(Z)/deg": ("Phase(Z)", "deg"),
    "Phase(Zce)/deg": ("Phase(Zce)", "deg"),
    "Phase(Zwe-ce)/deg": ("Phase(Zwe-ce)", "deg"),
    "Q charge/discharge/mA.h": ("Q charge/discharge", "mA·h"),
    "Q charge/mA.h": ("Q charge", "mA·h"),
    "Q charge/mA.h/g": ("Q charge", "mA·h/g"),
    "Q discharge/mA.h": ("Q discharge", "mA·h"),
    "Q discharge/mA.h/g": ("Q discharge", "mA·h/g"),
    "R/Ohm": ("R", "Ω"),
    "Rcmp/Ohm": ("Rcmp", "Ω"),
    "Re(Y)/Ohm-1": ("Re(Y)", "S"),
    "Re(Z)/Ohm": ("Re(Z)", "Ω"),
    "Re(Zce)/Ohm": ("Re(Zce)", "Ω"),
    "Re(Zwe-ce)/Ohm": ("Re(Zwe-ce)", "Ω"),
    "step time/s": ("step time", "s"),
    "THD Ewe/%": ("THD Ewe", "%"),
    "THD I/%": ("THD I", "%"),
    "time/s": ("time", "s"),
    "x": ("x", None),
    "z cycle": ("z cycle", None),
}
*/

/**
 * name:string,
 * params: Parameters;
 */
export type GetParams = (
  technique: string,
  lines: string[],
  i: number,
  techniques: string[],
) => [StringObject, boolean, number];
/**
 * Parses technique from the _.mps_ file
 * @param techniques - the full name of the technique.
 * @param lines - lines to read
 * @param i - index to start reading
 * @return `[params, boolean, newIndex]`, `boolean` indicates whether is a known technique
 */
export const getParams: GetParams = function getParams(
  technique,
  lines,
  i,
  techniques,
) {
  let params: StringObject = {};

  for (i; i < lines.length; i++) {
    const thisLine = lines[i].trim();

    if (thisLine === '') break;

    // k-v pairs for this technique
    let kV = thisLine.split(/\s{2,}/);
    const k = kV[0].trim();
    const v = kV.slice(1).join('  ').trim();
    params[k] = v || '';
  }
  if (techniques.includes(technique)) {
    return [params, true, i - 1]; // i - 1 is the index of the last line read
  } else {
    return [params, false, i - 1];
  }
};

/**
 * Creates an mps object from an mps file
 * @param data - pass the file as string, Buffer or Arraybuffer.
 * @returns JSON object representing the parsed data
 */
export function parseMPS(data: TextData): ComplexObject {
  const lines = ensureString(data, { encoding: 'windows-1252' }).split(/\r?\n/);
  const name = lines.shift(); //remove first element and assign
  return { name, ...parseMeta(lines) };
}
