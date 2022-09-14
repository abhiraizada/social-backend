const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderId :{ type: Number , required: true  },
    orderItems: { type: Array, default: null },
    email: { type: String, required: true },
    orderStatus: { type: String, default: null, required: true },
    paymentStatus: { type: String, default: null, required: true },
    type: { type: String, default: null },
    orderAmount: { type: Number, required: true },
    orderInstruction: { type: String, default: null },
    tableId: { type: Number, default: null },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("order", orderSchema);