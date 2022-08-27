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


// helpers
const corsAccept = ["192.168.1.4:3000", "192.168.1.4", "tide.sv3n.pro", "188.166.209.227", "*"];
const tokens = tokenInfo();

// server
const port = 8000;
const app = express();
const httpServer = createServer();
const io = new Server(httpServer, {
    path: "/",
    cors: {
      origin: corsAccept,
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
cron.schedule('0,15,30,45 * * * *', async ()=>{ // make sure cron job is executed at end of 15 minute mark. 12:00, 12:15, 12:30, 12:45

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
    tokens.forEach(item=>{
        const {pair, address} = item;
        const pairAddress = pair[0].address;

        change(pairAddress, (res)=>{
            const {open, high, low, close, price, stable, supply} = res;
            const tempToken = {
                token: address,
                pair: pairAddress,
                open: open,
                high: high,
                low: low,
                close: close,
                price: price || 0,
                stable: stable,
                supply: supply,
                marketcap: stable ? (supply * close).toString() : (supply * close * price).toString(),
            };

            Change.findOneAndUpdate({pair: pairAddress}, tempToken ,{upsert: true, new: true}, (err, token)=>{
                if(err) return;
            });
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