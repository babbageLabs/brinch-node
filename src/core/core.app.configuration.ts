/*
 * A helper method to return the application configuration
 */
import {AppConfiguration} from './core.data.types';
import * as process from 'process';

export const getAppConfig = (): AppConfiguration => {
  console.log('SCHEMA_DIR', process.env.SCHEMA_DIR);
  return {
    schema: {
      path: process.env.SCHEMA_DIR || '',
    },
  };
};
