const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const tableSchema = new mongoose.Schema({
    emailId: { type: String, default: null },
    currentOrders: { type: Array, default: null },
    status: { type: String , default: null },
    occupiedAt: { type: Date, default: null  },
    capacity: { type: Number, default: null  }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
tableSchema.plugin(AutoIncrement, {inc_field: 'tableNumber'});

module.exports = mongoose.model("table", tableSchema);