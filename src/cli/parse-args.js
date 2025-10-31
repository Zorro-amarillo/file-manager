import { argv } from 'process';

const parseArgs = () => {
    const args = argv.slice(2);
    const userArg = args.find(arg => arg.startsWith('--username='));
    const user = userArg ? userArg.split('=')[1] : 'Guest';

    return user;
}

export default parseArgs;