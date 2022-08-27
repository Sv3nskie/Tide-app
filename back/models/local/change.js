import mongoose from 'mongoose';
import Config from '../../config.js';


const {mainDb} = Config();
const db = mongoose.createConnection(mainDb);
const Change = db.useDb('TIDE-BSC');


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

export default Change.model('change', changeSchema);