import createReadline from "./cli/create-readline.js";
import parseArgs from "./cli/parse-args.js";
import createAppState from "./core/create-app-state.js";

const user = parseArgs();
const appState = createAppState(user);

createReadline(appState);