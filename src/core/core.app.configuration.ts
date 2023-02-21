/*
 * A helper method to return the application configuration
 */
import {AppConfiguration} from './core.data.types';
import * as process from 'process';
import * as path from 'path';

const normalizeFilePath = (filePath: string): string => {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.join(process.cwd(), filePath);
};

export const getAppConfig = (): AppConfiguration => {
  return {
    schema: {
      path: normalizeFilePath(
        process.env.SCHEMA_DIR || path.join(process.cwd(), 'schemas')
      ),
    },
  };
};
