import fs from 'fs';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { ParsedArgs } from 'minimist';

interface ClientEnv {
  [key: string]: string | undefined;
}

const REACT_APP = /^REACT_APP_/;

/**
 * Initialize the environment variable from .env* files.
 */
export function initEnvironment(args: ParsedArgs) {
  process.env.NODE_ENV = args.dev ? 'development' : 'production';
  process.env.BUILD_ENV = args.env || '';

  const dotenvFiles = ['.env'];
  if (args.env) dotenvFiles.unshift(`.env.${args.env}`);
  if (args.dev) dotenvFiles.unshift('.env.local');

  dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
      dotenvExpand(config({ path: dotenvFile }));
    }
  });
}

/**
 * Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
 * injected into the application via DefinePlugin in Webpack configuration.
 */
export function getClientEnvironment() {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env: ClientEnv, key: string) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV,
        BUILD_ENV: process.env.BUILD_ENV,
        PUBLIC_URL: process.env.PUBLIC_URL || '',
      } as ClientEnv,
    );

  const stringified = Object.keys(raw).reduce((env: ClientEnv, key: string) => {
    env[key] = JSON.stringify(raw[key]);
    return env;
  }, {} as ClientEnv);

  return { raw, stringified };
}
