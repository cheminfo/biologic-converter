import { StringObject } from '../Types';

/**
 * name:string,
 * params: Parameters;
 */
export type GetParams = (lines: string[], i: number) => [StringObject, number];
/**
 * Parses technique from the _.mps_ file
 * @param lines - lines to read
 * @param i - index to start reading
 * @return `[params, newIndex]`, `boolean` indicates whether is a known technique
 */
export const getParams: GetParams = function getParams(lines, i) {
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
  return [params, i - 1];
};

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