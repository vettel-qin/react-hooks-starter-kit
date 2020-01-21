import path from 'path';

/**
 * Resolve absolute path
 * @param pathSegments path segments
 */
export function resolvePath(...pathSegments: string[]) {
  return path.resolve(ROOT_DIR, ...pathSegments);
}

/**
 * Resolve node_modules absolute path
 * @param moduleName
 */
export function resolveModule(moduleName: string) {
  return resolvePath('node_modules', moduleName);
}

/**
 * Root directory
 */
export const ROOT_DIR = path.resolve(__dirname, '../../');

/**
 * Source code directory
 */
export const SRC_DIR = resolvePath('src');

/**
 * Build output directory
 */
export const BUILD_DIR = resolvePath('build');

/**
 * Public assets directory
 */
export const PUBLIC_DIR = resolvePath('public');

/**
 * Entry directory
 */
export const ENTRY_DIR = resolvePath(SRC_DIR, 'entries');
