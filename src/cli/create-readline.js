import { stdin, stdout } from 'node:process';
import readline from 'node:readline/promises';
import { EOL } from 'node:os';
import { COMMANDS, MESSAGES } from '../core/app-constants.js';

const createReadline = (state) => {
  console.log(MESSAGES.START(state.username));

  const cli = readline.createInterface({ input: stdin, output: stdout });
  cli.setPrompt(MESSAGES.DIR(state.currentDir));

  cli.prompt();

  cli.on('SIGINT', () => {
    COMMANDS['.exit']({ state, cli });
  });

  cli.on('line', async (input) => {
    const commandName = input.trim().split(/\s+/)[0];
    const args = input.trim().split(/\s+/).slice(1);

    if (COMMANDS[commandName]) {
      await COMMANDS[commandName]({ state, cli, args });
    }

    stdout.write(EOL);
    cli.prompt();
  });
}

export default createReadline;