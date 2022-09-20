import tokens from '../models/token.js';
import tx from '../models/tx.js';
import Candles from '../models/local/candles.js'
import Change from '../models/local/change.js';
import Market from '../models/local/market.js';




/**
 * 
 * Aggregation for candlestick data
 * @param {address, resolution} req - pairAddress, resolution = timeframe for candles
 * @return {object} - high, open, low, close, amount, time, price
 * 
 */
export function chart(address, lastCandle, next){
    tx.aggregate([
        {$match:  {pairAddress: address}},
        {$lookup:{
            from: "price",
            localField: "block",
            foreignField: "block",
            as: "priceInfo"
        }},

        {$addFields:{
            timestampBoundary: {
                $subtract: [
                    "$timestamp",
                    {$mod: ["$timestamp", 300]}
                ]
            },
        }},

        {$group:{
            _id: "$timestampBoundary",
            open: {$first: "$conversionRate"},
            high: {$max: "$conversionRate"},
            low: {$min: "$conversionRate"},
            close: {$last: "$conversionRate"},
            amount: {
                $sum: {
                    $toDecimal: "$baseAmount"
                }
            },
            time: {$last: '$timestamp'},
            price: {$last: { $arrayElemAt: [ "$priceInfo.price", 0 ] }},
        }},

        {$match: { _id: { $gt: lastCandle } }},

        {$sort: {"_id": 1}},

    ]).then((res)=>{
        next(res);
    }).catch((err)=>{
        console.log(err);
    });
};




/**
 * 
 * Aggregation for candlestick data
 * @param {address, resolution} req - pairAddress, resolution = timeframe for candles
 * @return {object} - high, open, low, close, amount, time, price
 * 
 */
export function chartTime(req, res){
    const {address, resolution} = req.query;

    Candles.aggregate([
        {$match:  {pair: address}},

        {$addFields:{
            timestampBoundary: {
                $subtract: [
                    "$time",
                    {$mod: ["$time", parseInt(resolution)]}
                ]
            },
        }},

        {$group:{
            _id: "$timestampBoundary",
            open: {$first: "$open"},
            high: {$max: "$high"},
            low: {$min: "$low"},
            close: {$last: "$close"},
            amount: {
                $sum: {
                    $toDecimal: "$amount"
                }
            },
            time: {$last: '$time'},
            price: {$last: '$price'},
        }},

        {$sort: {"_id": 1}},

    ]).then((data)=>{
        return res.status(200).json(data);
    }).catch((err)=>{
        console.log(err);
    });
};




/**
 * 
 * Aggregation
 * @param {address} req - tokenAddress
 * @return {address, pairs}
 * 
 */
export function tokenInfo(req, res){
    const {address} = req.query;

    tokens.aggregate([ // sreach by tokenAddress
        {$match:  {address: address}},
        {$lookup:{
            from: "pairs",
            localField: "address",
            foreignField: "baseToken",
            as: "pairInfo"
        }},

        {$project:{
            address: "$address.pairAddress",
            pairs: "$pairInfo",
        }},

    ]).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        console.log(err);
    });
};




/**
 * 
 * Aggregation
 * @param {address} req - pairAddress
 * @return {}
 * 
 */
export function trades(address, next){ // get last 30 swaps/trades

    tx.aggregate([
        {$match:  {pairAddress: address}},
        {$lookup:{
            from: "price",
            localField: "block",
            foreignField: "block",
            as: "priceInfo"
        }},

        {$project:{
            txHash: "$txHash",
            price: { $arrayElemAt: [ "$priceInfo.price", 0 ] },
            timestamp: "$timestamp",
            baseAmount: "$baseAmount",
            quoteAmount: "$quoteAmount",
            type: "$type",
            wallet: "$wallet",
            stable: "$stable",
            conversionRate: "$conversionRate",
        }},

        {$sort: {"_id": -1}},
        {$limit: 30},

    ]).then((data)=>{
        next(data);
    }).catch((err)=>{
        console.log(err);
    });
};




/**
 * 
 * Aggregation
 * @param {address} req - pairAddress
 * @return {object}
 * 
 */
export function getTrades(req, res){
    const {address} = req.query;
    Market.findOne({pair: address}, (err, market)=>{
        if(err) return console.log(err);
        return res.status(200).json(market);
    });
};




/**
 * 
 * Aggregation
 * @param {address} req - pairAddress
 * @return {object}
 * 
 */
export function change(address, next){
    
    tx.aggregate([
        {$match:  {pairAddress: address}},
        {$lookup:{
            from: "price",
            localField: "block",
            foreignField: "block",
            as: "priceInfo"
        }},

        {$lookup:{
            from: "tokens",
            localField: "tokenAddress",
            foreignField: "address",
            as: "tokenInfo"
        }},

        {$addFields:{
            timestampBoundary: {
                $subtract: [
                    "$timestamp",
                    {$mod: ["$timestamp", 86400]}
                ]
            },
        }},

        {$group:{
            _id: "$timestampBoundary",
            open: {$first: "$conversionRate"},
            high: {$max: "$conversionRate"},
            low: {$min: "$conversionRate"},
            close: {$last: "$conversionRate"},
            price: {$max: {$arrayElemAt: ["$priceInfo.price", 0]}},
            supply: {$first: {$arrayElemAt: ["$tokenInfo.supply", 0]}},
            stable: {$last: "$stable"},
        }},

        {$sort: {"_id": -1}},

        {$limit: 1},

    ]).then((data)=>{
        next(data[0]);
    }).catch((err)=>{
        console.log(err);
    });
};




/**
 * 
 * Aggregation
 * @param {address} req - pairAddress
 * @return {}
 * 
 */
export function listInfo(req, res){
    Change.find({}).lean().then(list=>{
        res.status(200).json(list);
    });
};




/**
 * 
 * query
 * @param {address} req - pairAddress
 * @return {object}
 * 
 */
export function changeFor(req, res){
    const {address} = req.query;
    Change.findOne({pair: address}).lean().then(list=>{
        res.status(200).json(list);
    });
};