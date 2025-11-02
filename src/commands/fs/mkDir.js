import { join } from "node:path";
import { mkdir } from "node:fs/promises";
import { MESSAGES } from "../../core/app-constants.js";

const mkDir = async ({ state, args }) => {
  try {
    const [ dirName ] = args;
    const isValidName = name => !/[*?"<>|:/\\]/.test(name);

    if (!dirName || !dirName.trim() || !isValidName(dirName)) {
      console.error(MESSAGES.INVALID_INPUT());
      return;
    }

    const { currentDir } = state;
    const dirPath = join(currentDir, dirName);

    await mkdir(dirPath);
    console.log('Folder created successfully');
  } catch (err) {
    console.error(MESSAGES.FAIL());
  }
};

export default mkDir;