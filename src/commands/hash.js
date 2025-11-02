import { createHash } from "crypto";
import { createReadStream } from "fs";
import { resolve } from "node:path";
import { stdout } from "process";
import { MESSAGES } from "../core/app-constants.js";

const hash = async ({ state, args }) => {
  const { currentDir } = state;
  const [ filename ] = args;
  const isValidName = name => !/[*?"<>|]/.test(name);

  if (!filename || !filename.trim() || !isValidName(filename)) {
    console.error(MESSAGES.INVALID_INPUT());
    return;
  }

  const filePath = resolve(currentDir, filename);

  await new Promise((res) => {
    const readStream = createReadStream(filePath);
    const hash = createHash('sha256');

    readStream.on('error', () => {
      console.error(MESSAGES.FAIL());
      res();
    });

    readStream.pipe(hash).setEncoding('hex').pipe(stdout);

    hash.on('end', () => {
      stdout.write('\n');
      res();
    });
    hash.on('error', () => {
      console.error(MESSAGES.FAIL());
      res();
    });
  });
};

export default hash;