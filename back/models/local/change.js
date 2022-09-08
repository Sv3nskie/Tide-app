import mongoose from 'mongoose';


const changeSchema = new mongoose.Schema({
    token:{
        type: String,
        index: true,
        unique : true,
    },
    pair:{
        type: String,
        index: true,
        unique : true,
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
    price: {
        type: String,
    },
    stable: {
        type: String,
    },
    supply: {
        type: String,
    },
    marketcap:{
        type: String,
    },
},{collection: 'change'});

export default mongoose.model('change', changeSchema);