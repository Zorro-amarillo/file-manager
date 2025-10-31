import { stdin, stdout } from 'node:process';
import readline from 'node:readline/promises';
import { EOL } from 'node:os';
import exitCli from './exit-cli.js';

const createReadline = (state) => {
    const { username, currentDir } = state;

    console.log(`Welcome to the File Manager, ${username}!`);

    const cli = readline.createInterface({ input: stdin, output: stdout });
    cli.setPrompt(`You are currently in ${currentDir}${EOL}`);

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