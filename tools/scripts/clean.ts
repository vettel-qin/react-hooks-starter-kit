import fs from 'fs-extra';
import { BUILD_DIR } from '../config/paths.config';

/**
 * Cleans up the output (build) directory.
 */
async function clean() {
  await fs.remove(BUILD_DIR);
}

export default clean;
