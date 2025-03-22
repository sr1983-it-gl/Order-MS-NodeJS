

import mongoose from 'mongoose';

import {randomUUID} from "crypto"

const OrderSchema = new mongoose.Schema({


    customerName: {
        type: String,
        required: true,
    },
    orderItems: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const Order = mongoose.model("order", OrderSchema);
export {Order}

