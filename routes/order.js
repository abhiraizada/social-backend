const User = require("../model/user");
const Order = require("../model/order");
const Table = require("../model/table");
const Seq = require("../model/seq");
const express = require('express')
const router = express.Router();
const sse = require("../sse");
const { getOrdersController, createOrderController } = require("../controllers/orders.controller");

// const bcrypt = require('bcrypt')
// const jwt = require("jsonwebtoken");

async function getValueForNextSequence(sequenceOfName) {

    console.log('sequenceOfName', sequenceOfName)
    let filter = { seq_name: sequenceOfName }
    let updates = { $inc: { seq_val: 1 } }
    var sequenceDoc = await Seq.findOneAndUpdate(
        filter,
        updates,
        { returnOriginal: false }
    );
    console.log('sequenceDoc', sequenceDoc)
    return sequenceDoc.seq_val;
}

router.get("/test", async (req, res) => {

    try {
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

<<<<<<< Updated upstream
router.get("/:id", async (req, res) => {
    let orderId = req.params.id
=======
router.get("/orderid/:id", async (req, res) => {
    const query = { orderId: req.params.id };

>>>>>>> Stashed changes
    try {
        let order = await Order.findById(orderId)
        res.status(201).json({ order });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.post("/createOrder", async (req, res) => {
    let orderId = await getValueForNextSequence('orderId')
    console.log('orderId', orderId)
    try {
        let { orderItems, email, orderStatus, paymentStatus, type, orderAmount, orderInstruction, tableId } = req.body

        const order = await Order.create({
            orderId, orderItems, email, orderStatus, paymentStatus, type, orderAmount, orderInstruction
        });
        await Table.updateOne({ tableId: tableId },
<<<<<<< Updated upstream
             { $set : { currentOrders: { $push: { orderId, orderItems, email, orderStatus, paymentStatus, type, orderAmount, orderInstruction } } ,
            status: 'occupied'} })
        res.status(200).json({ message: "Order Placed" });
=======
            {
                $set: {
                    currentOrders: { $push: { orderItems, email, orderStatus, paymentStatus, orderType, orderAmount } },
                    status: 'occupied'
                }
            })
            sse.send(order, "order_created");

        res.status(200).json({ message: "Order Placed" })

>>>>>>> Stashed changes
    } catch (err) {
        res.status(500).json("Server Error!")
        console.log(err);
    }
});
// router.get("/allOrders", getOrdersController);

// router.post("/createOrder", createOrderController);


router.get("/allOrders", async (req, res) => {
    try {
<<<<<<< Updated upstream
        let data = await Order.find({ createdAt : { $gte: new Date().getTime()} })
        res.status(200).json({ data: data });
=======
        let data = await Order.find({ createdAt: "2022-11-17T11:30:49.857Z" })
        //let data=await Order.find()
        res.status(200).json({ orders: data });
>>>>>>> Stashed changes
    } catch (err) {
        res.status(500).json("Server Error!")
        console.log(err);
    }
});

module.exports = router;