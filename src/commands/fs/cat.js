import { createReadStream } from 'fs';
import { resolve } from 'node:path';
import { stdout } from 'process';
import { MESSAGES } from "../../core/app-constants.js";

const cat = async ({ state, args, cli }) => {
  const [ fileToRead ] = args;
  const { currentDir } = state;

  if (!fileToRead || !fileToRead.trim()) {
    console.error(MESSAGES.INVALID_INPUT());
    return;
  }

  const filePath = resolve(currentDir, fileToRead);

  await new Promise((res) => {
    const readStream = createReadStream(filePath);

    readStream
      .on('data', chunk => {
        stdout.write(chunk);
      })
      .on('end', () => {
        stdout.write('\n');
        res();
      })
      .on('error', () => {
        console.error(MESSAGES.FAIL());
        res();
      });
  });
};

export default cat;