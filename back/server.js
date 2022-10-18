import express from 'express';
import cors from 'cors';
import {createServer} from "http";
import {Server} from "socket.io";
import morgan from 'morgan';
import api from './routes.js';
import tx from './models/tx.js'
import cron from 'node-cron';
import Candles from './models/local/candles.js';
import {chart, change, trades} from './controllers/bsc.js';
import { tokenInfo } from './tokens.js';
import Change from './models/local/change.js';
import Market from './models/local/market.js';
import Tokens from './models/token.js';
import mongoose from 'mongoose';
import Config from './config.js';
import Web3 from "web3";
import factoryABI from './controllers/factoryABI.js';
import pairABI from './controllers/pairABI.js';
import tokenABI from './controllers/tokenABI.js';



// helpers
const corsAccept = ["192.168.1.4:3000", "192.168.1.4", "app.tide.exchange", "188.166.209.227", "*", "192.168.100.185"];
const tokens = tokenInfo();
const {mainDb, rpc} = Config();

mongoose.connect(mainDb);

// server
const port = 8000;
const app = express();
const httpServer = createServer();
const io = new Server(httpServer, {
    path: "/",
    cors: {
      origin: '*',
      methods: ["GET", "POST"]
    }
});
httpServer.listen(4000);
app.listen(port);



// middleware
app.use(cors({origin: '*', methods: ["GET", "POST"]}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());



// routes
app.use('/api', api);

app.get('/rpc/price', async (req, res)=>{
    const {from, to} = req.query;
    const factoryAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73';
    const web3 = new Web3(rpc);

    

    const factory = new web3.eth.Contract(factoryABI(), factoryAddress);
    const pairAddress = await factory.methods.getPair(from, to).call().catch(err=>console.log(err));
    const pair = new web3.eth.Contract(pairABI(), pairAddress);
    const reserves = await pair.methods.getReserves().call().catch(err=>console.log(err));
    const token0 = await pair.methods.token0().call().catch(err=>console.log(err));
    const token1 = await pair.methods.token1().call().catch(err=>console.log(err));

    const token0Contract = new web3.eth.Contract(tokenABI(), token0);
    const token1Contract = new web3.eth.Contract(tokenABI(), token1);

    const token0Decimals = await token0Contract.methods.decimals().call().catch(err=>console.log(err));
    const token1Decimals = await token1Contract.methods.decimals().call().catch(err=>console.log(err));

    const data = {
        pairAddress: pairAddress,
        token0: token0,
        token1: token1,
        reserves0: reserves[0] / (10 ** token0Decimals),
        reserves1: reserves[1] / (10 ** token1Decimals)
    }
    
    return await res.status(200).json(data);

});

// Socket
io.on('connection', (socket)=>{
    let pairID;
    socket.on('pair', (data)=>{
        pairID = data.pairAddress;
        const changeStream = tx.watch();
        changeStream.on("change", change => {
            if(change.fullDocument.pairAddress === pairID){
                socket.emit('change', change.fullDocument);
            };
        });
    });
});



// cronjobs
cron.schedule('0,15,30,45 * * * *', async ()=>{ // 

    const lastCandle = await Candles.find({}).sort({'time': -1}).limit(1).lean().then(last=>{
        return last.length === 0 ? 0 : last[0].time
    });

    tokens.forEach(item=>{
        const {pair, address} = item;
        const pairAddress = pair[0].address;
        
        chart(pairAddress, lastCandle, (res)=>{
            if(res.length === 0) return;
            res.forEach(candle=>{
                const tempCandle = {
                    uniqueId: pairAddress+'-'+candle._id,
                    pair:  pairAddress,
                    token:  address,
                    open: candle.open,
                    high: candle.high,
                    low: candle.low,
                    close: candle.close,
                    amount: candle.amount.toString(),
                    time: candle._id,
                    price: candle.price || '0',
                };
                
                const newCandle = new Candles(tempCandle);
                newCandle.save((err)=>{
                    if(err){
                        if(err.code === 11000) return;
                        return console.log(err.code);
                    };
                });

            });
        });
    });

    // change aggregation
    tokens.forEach(async(item)=>{
        const {pair, address} = item;
        const pairAddress = pair[0].address;
        const web3 = new Web3(rpc);
        const tokenContract = new web3.eth.Contract(tokenABI(), address);
        const supply = await tokenContract.methods.totalSupply().call().catch(err=>console.log(err));
        const decimals = await tokenContract.methods.decimals().call().catch(err=>console.log(err));
        
        change(pairAddress, (res)=>{
            const {open, high, low, close, price, stable} = res;
            const tempToken = {
                token: address,
                pair: pairAddress,
                open: open,
                high: high,
                low: low,
                close: close,
                price: price || 0,
                stable: stable,
                supply: supply / (10 ** decimals),
                marketcap: stable ? (supply * close).toString() : (supply * close * price).toString(),
            };

            Change.findOneAndUpdate({pair: pairAddress}, tempToken ,{upsert: true, new: true}, (err, token)=>{
                if(err) return console.log(err);
            });

            Tokens.findOneAndUpdate({address: address}, {supply: supply / (10 ** decimals)}, (err, token)=>{
                if(err){
                    console.log(err)
                }
            })
        });
    });
});


cron.schedule('30 */5 * * * *', async ()=>{
    tokens.forEach(item=>{
        const {pair} = item;
        const pairAddress = pair[0].address;
        
        trades(pairAddress, (res)=>{
            let array = [];

            res.forEach(item=>{
                const tempSwap = {
                    txHash: item.txHash,
                    price: item.price,
                    timestamp: item.timestamp,
                    baseAmount: item.baseAmount,
                    quoteAmount: item.quoteAmount,
                    type: item.type,
                    wallet: item.wallet,
                    stable: item.stable,
                    conversionRate: item.conversionRate,
                };
                array.push(tempSwap);
            });
            Market.findOneAndUpdate({pair: pairAddress}, {pair: pairAddress, "market": array}, {upsert: true, new: true}, (err, swaps)=>{
                if(err) return console.log(err);
            });
        });
    });
});
