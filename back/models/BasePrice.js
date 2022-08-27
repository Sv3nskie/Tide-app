import mongoose from 'mongoose';
import Config from '../config.js';


const {mainDb} = Config();
const db = mongoose.createConnection(mainDb);
const Price = db.useDb('TIDE-BSC');

const priceSchema = new mongoose.Schema({
    price:{
        type: String,
    },
    block:{
        type: Number,
        index: true,
        unique: true
    },
},{collection: 'price'});

export default Price.model('Price', priceSchema);