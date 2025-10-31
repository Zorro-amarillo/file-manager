import { dirname, parse } from "node:path";
import { MESSAGES } from "../core/app-constants.js";

const up = (state, cli) => {
    const { currentDir } = state;

    const rootFolder = parse(currentDir).root;
    const newDir = currentDir === rootFolder ? currentDir : dirname(currentDir);

    cli.setPrompt(MESSAGES.DIR(newDir));
    state.currentDir = newDir;
};

export default up;