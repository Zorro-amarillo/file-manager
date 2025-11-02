import { access, rename, stat } from 'node:fs/promises';
import { join, parse, resolve } from 'node:path';
import { isValidName, MESSAGES } from "../../core/app-constants.js";

const rn = async ({ state, args }) => {
  const [ filePath, newFileName ] = args;
  const { currentDir } = state;

  if (!filePath || !newFileName || !filePath.trim() || !newFileName.trim() || !isValidName(newFileName)) {
    console.error(MESSAGES.INVALID_INPUT());
    return;
  }

  const currentPath = resolve(currentDir, filePath);
  const currentFolder = parse(currentPath).dir;
  const newPath = join(currentFolder, newFileName);

  try {
    const statObj = await stat(currentPath);

    if (!statObj.isFile()) {
      console.error(MESSAGES.FAIL());
      return;
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(MESSAGES.FAIL());
      return;
    }
  }

  try {
    await access(newPath);
    throw new Error(MESSAGES.FAIL());
  } catch (err) {
    if (err.code === 'ENOENT') {
      await rename(currentPath, newPath);
      console.log('File renamed successfully');
      return;
    }

    console.error(MESSAGES.FAIL());
  }
};

export default rn;