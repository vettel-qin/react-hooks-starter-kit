import fs from 'fs-extra';
import { PUBLIC_DIR, BUILD_DIR } from '../config/paths.config';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  if (fs.pathExistsSync(PUBLIC_DIR)) {
    await fs.copy(PUBLIC_DIR, BUILD_DIR);
  }
}

export default copy;
