import { EOL } from 'node:os';
import { exit } from 'node:process';
import up from '../commands/up.js';
import cd from '../commands/cd.js';
import os from '../commands/os.js';

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
  '.exit': ({ state, cli }) => {
    console.log(MESSAGES.EXIT(state.username));
    cli.close();
    exit();
  },
};