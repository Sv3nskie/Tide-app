import * as dotenv from "dotenv";
dotenv.config();


const config = {
    walletConnect: process.env.WALLET_CONNECT,
    rpc: process.env.QUICKNODE,
    baseUrl: {local: 'http://192.168.1.2:8000'}, // 188.166.209.227 -- production
    sock: {local: 'http://192.168.1.2:4000'}, // 192.168.1.4 -- local
}

export default function Config(){
    return config;
};