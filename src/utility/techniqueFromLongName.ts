/**
 * maps the text in the MPT/MPS file to the corresponding technique and parameters
 * @param id - id of the technique
 * @returns - technique name and parameters
 */
export function techniqueFromLongName(id: string): string {
  switch (id) {
    case 'Galvanostatic Cycling with Potential Limitation':
      return 'GCPL';
    case 'Cyclic Voltammetry':
      return 'CV';
    case 'Open Circuit Voltage':
      return 'OCV';
    case 'Chronoamperometry / Chronocoulometry':
      return 'CA';
    case 'Chronopotentiometry':
      return 'CP';
    case 'Wait':
      return 'WAIT';
    case 'Potentio Electrochemical Impedance Spectroscopy':
      return 'PEIS';
    case 'Galvano Electrochemical Impedance Spectroscopy':
      return 'GEIS';
    case 'IR compensation (PEIS)':
      return 'ZIR';
    case 'Linear Sweep Voltammetry':
      return 'LSV';
    case 'Modulo Bat':
      return 'MB';
    case 'Manual IR compensation': //this technique isn't listed anywhere else
      return 'MIR';
    default:
      return id;
  }
}
