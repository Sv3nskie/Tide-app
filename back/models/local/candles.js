import mongoose from 'mongoose';
import Config from '../../config.js';

const {mainDb} = Config();
const db = mongoose.createConnection(mainDb);
const Candles = db.useDb('TIDE-BSC');


const candlesSchema = new mongoose.Schema({
    uniqueId:{
        type: String,
        index: true,
        unique : true,
    },
    pair:{
        type: String,
        index: true,
    },
    token:{
        type: String,
        index: true,
    },
    open: {
        type: String,
    },
    high: {
        type: String,
    },
    low: {
        type: String,
    },
    close: {
        type: String,
    },
    amount: {
        type: String,
    },
    time: {
        type: Number,
    },
    price: {
        type: String,
    },
},{collection: 'candles'});

export default Candles.model('Candles', candlesSchema);