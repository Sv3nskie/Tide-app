import mongoose from 'mongoose';


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

export default mongoose.model('Candles', candlesSchema);