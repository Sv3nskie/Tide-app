import * as dotenv from "dotenv";
dotenv.config();

const data = {
    mainDb: 'mongodb://admin:MasterDBSwappAdm1n2022@174.138.22.13:27017/TIDE-BSC?authSource=admin&readPreference=primary&directConnection=true&ssl=false',
    localDb: 'mongodb://127.0.0.1:27017/TIDE-BSC',
    rpc: 'http://65.109.48.159:8545',
    socket: 'ws://65.109.48.159:8546',
};

export default function Config(){
    return data;
};