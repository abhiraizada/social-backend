const User = require("../model/user");
const Order = require("../model/order");
const Table = require("../model/table");
const Seq = require("../model/seq");
const express = require('express')
const router = express.Router();
const sse = require("../sse");

// const bcrypt = require('bcrypt')
// const jwt = require("jsonwebtoken");

// async function getValueForNextSequence(sequenceOfName) {

//     console.log('sequenceOfName', sequenceOfName)
//     let filter = { seq_name: sequenceOfName }
//     let updates = { $inc: { seq_val: 1 } }
//     var sequenceDoc = await Seq.findOneAndUpdate(
//         filter,
//         updates,
//         { returnOriginal: false }
//     );
//     console.log('sequenceDoc', sequenceDoc)
//     return sequenceDoc.seq_val;
// }

router.get("/test", async (req, res) => {

    try {

        res.status(201)

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/orderid/:id", async (req, res) => {
    const query = { orderId: req.params.id };

    try {
        const order = await Order.findOne(query);

        res.status(201).json({ order });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.post("/createOrder", async (req, res) => {
    try {
        let { orderItems, email, orderStatus, paymentStatus, orderType, orderAmount, tableNumber } = req.body

        const order = await Order.create({
            orderItems, email, orderStatus, paymentStatus, orderType, orderAmount
        });
        const query = { tableNumber: tableNumber };

        const orderTable = await Table.findOne(query);

        if (orderTable?.tableNumber != tableNumber) {
            res.status(500).json({ message: "Cannot place an order because of invalid table number" })
        }

        else {
            await Table.updateOne({ tableNumber: tableNumber },
                {
                    $set: {
                        currentOrders: { orderItems, email, orderStatus, paymentStatus, orderType, orderAmount },
                        status: 'occupied'
                    }
                })
            sse.send(order, "order_created");

            res.status(200).json({ message: "Order Placed" })
        }
    } catch (err) {
        res.status(500).json("Server Error!")
        console.log(err);
    }
});

router.get("/allOrders", async (req, res) => {
    try {
        let data = await Order.find({ createdAt: "2022-11-17T11:30:49.857Z" })
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json("Server Error!")
    }
});

module.exports = router;