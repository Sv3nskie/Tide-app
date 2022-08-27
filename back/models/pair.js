import mongoose from 'mongoose';
import Config from '../config.js';

const {mainDb} = Config();
const db = mongoose.createConnection(mainDb);
const Pair = db.useDb('TIDE-BSC');


const pairSchema = new mongoose.Schema({
    pairAddress:{ // pair contact address
        type: String,
        required: true,
        unique : true,
        index: true
    },
    name:{ // pair name
        type: String,
        required: true,
    },
    baseToken:{
        type: String,
        required: true,
    },
    quoteToken:{
        type: String,
        required: true,
    },
    baseDecimals:{
        type: Number,
    },
    base0:{ // is base token token0?
        type: Boolean,
        required: true,
    },
    stable:{ // is quote token stablecoin?
        type: Boolean,
        required: true,
    },
    price:{
        type: String,
    },
    change24:{
        type: String,
    },
    high24:{
        type: String,
    },
    low24:{
        type: String,
    },
},{collection: 'pairs', timestamps: true});

export default Pair.model('Pair', pairSchema);