const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    tableNumber: { type: Number, required: true, unique: true },
    capacity: { type: Number, required: true},

    emailId: { type: String, default: null },
    currentOrders: { type: Array, default: null },
    status: { type: String , default: "available" },
    occupiedAt: { type: Date, default: null  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("table", tableSchema);