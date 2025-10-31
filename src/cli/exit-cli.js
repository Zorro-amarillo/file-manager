import { exit } from "node:process";
import { MESSAGES } from "../core/app-constants.js";

const exitCli = (user, rl) => {
    console.log(MESSAGES.EXIT(user));
    rl.close();
    exit();
};

export default exitCli;