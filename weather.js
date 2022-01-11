#!/ust/bin/env node
import { getArgs } from "./helpers/args.js";

const initCLI = () => {
    const args = getArgs(process.argv);
    console.log(args);
    if (args.h) {
        // help output
    }
    if (args.s) {
        // save the town
    }
    if (args.t) {
        //  save the token
    }
    // 
};

initCLI();