const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    order_items: { type: Array, default: null },
    email: { type: String, required: true },
    orderStatus: {type: String, default: null },
    paymentStatus: {type: String, default: null },
    type: {type: String, default: null },
     
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("item", itemSchema);