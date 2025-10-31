import { stdin, stdout } from 'node:process';
import readline from 'node:readline/promises';
import { EOL } from 'node:os';

const createReadline = (state) => {
    const { username, currentDir } = state;

    console.log(`Welcome to the File Manager, ${username}!`);

    const cli = readline.createInterface({ input: stdin, output: stdout });
    cli.setPrompt(`You are currently in ${currentDir}${EOL}`);

    cli.prompt();

    cli.on('line', () => {
        stdout.write(EOL);
        cli.prompt();
    });
}

export default createReadline;