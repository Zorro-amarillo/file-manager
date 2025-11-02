import { EOL } from 'node:os';
import { exit } from 'node:process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import up from '../commands/up.js';
import cd from '../commands/cd.js';
import os from '../commands/os.js';
import add from '../commands/fs/add.js';
import mkDir from '../commands/fs/mkdir.js';
import rm from '../commands/fs/rm.js';
import rn from '../commands/fs/rn.js';

export const MESSAGES = {
  START: (user) => `Welcome to the File Manager, ${user}!`,
  EXIT: (user) => `Thank you for using File Manager, ${user}, goodbye!`,
  DIR: (dir) => `You are currently in ${dir}${EOL}`,
  INVALID_INPUT: () => 'Invalid input',
  FAIL: () => 'Operation failed',
};

export const COMMANDS = {
  up,
  cd,
  os,
  add,
  mkdir: mkDir,
  rm,
  rn,
  '.exit': ({ state, cli }) => {
    console.log(MESSAGES.EXIT(state.username));
    cli.close();
    exit();
  },
};

export const isValidName = name => !/[*?"<>|:/\\]/.test(name);

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
