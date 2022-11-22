const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    phone_number: { type: String, default: null, unique:true },
    email: { type: String, default: null,unique:true },
    type: { type: String, default: null },
    reward_points: { type: Number, default: null },
    offers: { type: Array, default: null },
    dob: { type: Date, default: null }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("customer", customerSchema);