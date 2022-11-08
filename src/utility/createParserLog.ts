export interface ParserLog {
  kind: 'error' | 'warn' | 'info' | 'debug' | 'summary';
  parser: string;
  message: string;
  relativePath?: string;
  error?: Error;
}

export function createLogEntry(info: Partial<ParserLog>): ParserLog {
  const {
    parser = 'biologic-converter',
    kind = 'error',
    message = 'Error parsing biologic experiment.',
  } = info;

  const log: ParserLog = {
    parser,
    kind,
    message,
  };

  if (info.error) {
    log.error = info.error;
  }
  if (info.relativePath) {
    log.relativePath = info.relativePath;
  }
  return log;
}
