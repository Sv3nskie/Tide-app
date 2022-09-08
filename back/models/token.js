import mongoose from 'mongoose';


const tokenSchema = new mongoose.Schema({
    name:{
        type: String,
        index: true,
        required: true,
    },
    symbol:{
        type: String,
        required: true,
        index: true,
    },
    address:{
        type: String,
        required: true,
        unique : true,
        index: true,
    },
    decimals:{
        type: Number,
        required: true,
    },
    supply:{
        type: String,
        required: true,
    },
    network:{
        type: String,
        required: true,
    },
},{collection: 'tokens', timestamps: true});

export default mongoose.model('token', tokenSchema);