import { resolve } from "node:path";
import { MESSAGES } from "../core/app-constants.js";
import { access } from "node:fs/promises";

const cd = async ({ state, cli, args }) => {
  try {
    const [ dir ] = args;

    const isValidPath = (dir) => !/[*?"<>|]/.test(dir);

    if (!dir || !isValidPath(dir)) {
      throw new Error(MESSAGES.INVALID_INPUT());
    }

    const newDir = resolve(state.currentDir, dir);
    await access(newDir);
    state.currentDir = newDir;
    cli.setPrompt(MESSAGES.DIR(state.currentDir));
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(MESSAGES.FAIL());
    } else {
      console.error(err.message);
    }
  }
};

export default cd;