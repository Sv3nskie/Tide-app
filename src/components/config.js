import * as dotenv from "dotenv";
dotenv.config();


const config = {
    walletConnect: 'c40d7195e555a905e4ae9ac3534fbd53',
    rpc: 'http://65.109.48.159:8545',
    socket: 'ws://65.109.48.159:8546',
    baseUrl: {local: 'http://127.0.0.1:8000'}, // 188.166.209.227 -- production
    sock: {local: 'http://127.0.0.1:4000'}, // 192.168.1.4 -- local
}

export default function Config(){
    return config;
};