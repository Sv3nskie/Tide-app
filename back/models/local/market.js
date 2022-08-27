import mongoose from 'mongoose';
import Config from '../../config.js';

const {mainDb} = Config();
const db = mongoose.createConnection(mainDb);
const Market = db.useDb('TIDE-BSC');


const marketSchema = new mongoose.Schema({
    pair:{
        type: String,
        index: true,
        unique: true,
    },
    market:[{
        txHash: {
            type: String,
        },
        price: {
            type: String,
        },
        timestamp: {
            type: Number,
        },
        baseAmount: {
            type: String,
        },
        quoteAmount: {
            type: String,
        },
        type: {
            type: String,
        },
        wallet: {
            type: String,
        },
        stable: {
            type: String,
        },
        conversionRate: {
            type: String,
        },
    }],
},{collection: 'market'});

export default Market.model('Market', marketSchema);

