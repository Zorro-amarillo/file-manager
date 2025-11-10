import { homedir } from 'node:os';

const createAppState = (username) => {
    return {
        username,
        currentDir: homedir()
    }
};

export default createAppState;