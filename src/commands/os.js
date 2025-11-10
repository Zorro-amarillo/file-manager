import { EOL, cpus, homedir, userInfo, arch } from "node:os";

const OS_FLAGS = {
  '--EOL': () => console.log(`Default system End-Of-Line: ${JSON.stringify(EOL)}`),
  '--cpus': () => {
    const cpuList = cpus();
    console.log(`Overall amount of CPUS: ${cpuList.length}`);

    const cpuInfo = cpuList.map((item, index) => `${index + 1}. Model: ${item.model.trim()}. Clock rate: ${(item.speed / 1000).toFixed(1)} GHz`);
    console.log(`CPU info:${EOL}${cpuInfo.join(EOL)}`);
  },
  '--homedir': () => console.log(`Home directory: ${homedir()}`),
  '--username': () => console.log(`System user name: ${userInfo().username}`),
  '--architecture': () => console.log(`CPU architecture: ${arch()}`),
};

const os = ({ args }) => {
  const [ flag ] = args;

  if (!flag || !OS_FLAGS[flag]) {
    console.error('Invalid input');
    return;
  }

  OS_FLAGS[flag]();
};

export default os;