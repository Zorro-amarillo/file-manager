import { access, unlink } from 'fs/promises';
import { join } from 'path';
import { MESSAGES, isValidName } from '../../core/app-constants.js';

const rm = async ({ state, args }) => {
  try {
    const [ fileName ] = args;

    if (!fileName || !fileName.trim() || !isValidName(fileName)) {
      console.error(MESSAGES.INVALID_INPUT());
      return;
    }

    const { currentDir } = state;
    const currentFile = join(currentDir, fileName);

    await access(currentFile);
    await unlink(currentFile);
    console.log('File deleted successfully');
  } catch (err) {
    console.error(MESSAGES.FAIL());
  }
};

export default rm;