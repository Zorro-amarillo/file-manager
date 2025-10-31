import { EOL } from 'node:os';

export const MESSAGES = {
    START: (user) => `Welcome to the File Manager, ${user}!`,
    EXIT: (user) => `Thank you for using File Manager, ${user}, goodbye!`,
    DIR: (dir) => `You are currently in ${dir}${EOL}`
};
