import { join } from 'path';
import { readdir, stat } from 'fs/promises';
import { MESSAGES } from '../../core/app-constants.js';

const ls = async ({ state }) => {
  const { currentDir } = state;

  try {
    const files = await readdir(currentDir);
    const data = [];

    for (const item of files) {
      const info = await stat(join(currentDir, item));
      data.push({
        Name: item,
        Type: info.isFile() ? 'file' : 'directory'
      });
    }

    const compare = (a, b) => {
      if (a.Type === 'directory' && b.Type === 'file') {
        return -1;
      }

      if (a.Type === 'file' && b.Type === 'directory') {
        return 1;
      }

      return a.Name.localeCompare(b.Name);
    }

    console.table(data.sort(compare));
  } catch (err) {
    console.error(MESSAGES.FAIL());
  }
};

export default ls;