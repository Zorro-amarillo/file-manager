import { stdin, stdout } from 'node:process';
import readline from 'node:readline/promises';
import { EOL } from 'node:os';
import exitCli from './exit-cli.js';
import { MESSAGES } from '../core/app-constants.js';

const createReadline = (state) => {
    const { username, currentDir } = state;

    console.log(MESSAGES.START(username));

    const cli = readline.createInterface({ input: stdin, output: stdout });
    cli.setPrompt(MESSAGES.DIR(currentDir));

    cli.prompt();

    cli.on('SIGINT', () => {
        exitCli(username, cli);
    });

    cli.on('line', (input) => {
        if (input.trim() === '.exit') {
            exitCli(username, cli);
            return;
        }

        stdout.write(EOL);
        cli.prompt();
    });
}

export default createReadline;