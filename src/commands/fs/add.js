import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import { MESSAGES, isValidName } from "../../core/app-constants.js";

const add = async ({ state, args }) => {
  try {
    const [ fileName ] = args;

    if (!fileName || !fileName.trim() || !isValidName(fileName)) {
      console.error(MESSAGES.INVALID_INPUT());
      return;
    }

    const { currentDir } = state;
    const filePath = join(currentDir, fileName);

    await writeFile(filePath, '', { flag: 'wx' });
    console.log('File created successfully');
  } catch (err) {
    console.error(MESSAGES.FAIL());
  }
};

export default add;