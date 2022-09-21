import * as dotenv from "dotenv";
dotenv.config();


const config = {
    walletConnect: 'c40d7195e555a905e4ae9ac3534fbd53',
    rpc: 'http://65.109.48.159:8545',
    socket: 'ws://65.109.48.159:8546',
    baseUrl: {local: 'https://back.tide.exchange'}, // 188.166.209.227 -- production
    sock: {local: 'https://sock.tide.exchange'}, // 192.168.1.4 -- local
}

export default function Config(){
    return config;
};
