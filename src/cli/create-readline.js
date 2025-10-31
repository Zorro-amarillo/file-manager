import { stdin, stdout } from 'node:process';
import readline from 'node:readline/promises';
import { EOL } from 'node:os';
import exitCli from './exit-cli.js';
import { COMMANDS, MESSAGES } from '../core/app-constants.js';

const createReadline = (state) => {
    console.log(MESSAGES.START(state.username));

    const cli = readline.createInterface({ input: stdin, output: stdout });
    cli.setPrompt(MESSAGES.DIR(state.currentDir));

    cli.prompt();

    cli.on('SIGINT', () => {
        exitCli(state.username, cli);
    });

    cli.on('line', (input) => {
        const commandName = input.trim();

        if (COMMANDS[commandName]) {
            COMMANDS[commandName](state, cli);
        }

        stdout.write(EOL);
        cli.prompt();
    });
}

export default createReadline;