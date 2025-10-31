import { exit } from "node:process";

const exitCli = (user, rl) => {
    console.log(`Thank you for using File Manager, ${user}, goodbye!`);
    rl.close();
    exit();
};

export default exitCli;