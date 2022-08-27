import * as dotenv from "dotenv";
dotenv.config();


const config = {
    walletConnect: process.env.WALLET_CONNECT,
    rpc: process.env.QUICKNODE,
    baseUrl: {local: 'https://app.tide.exchange'}, // 188.166.209.227 -- production
    sock: {local: 'https://app.tide.exchange'}, // 192.168.1.4 -- local
}

export default function Config(){
    return config;
};