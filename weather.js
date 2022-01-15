#!/ust/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";
import dotenv from 'dotenv';

dotenv.config();

const saveToken = async (token) => {
    if (!token.length) {
        printError('Token not received')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token saved');
    } catch(e) {
        printError(e.message);
    }
};

const getForcast = async () => {
    try {
        const weather = await getWeather('Moscow');
        console.log(weather);
    } catch(e) {
        if (e?.response?.status == 404) {
            printError('Wrong city')
        } else if (e?.response?.status == 401) {
            printError('Wrong token')
        } else {
            printError(e.message)
        }
    }
};

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp();
    }
    if (args.s) {
        // save the town
    }
    if (args.t) {
        return saveToken(args.t);
    }
    getForcast();
};

initCLI();