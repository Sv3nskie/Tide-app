import mongoose from 'mongoose';


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

export default mongoose.model('Market', marketSchema);

