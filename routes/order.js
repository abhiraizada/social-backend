const User = require("../model/user");
const Order = require("../model/order");
const Table = require("../model/table");
const Seq = require("../model/seq");
const express = require('express')
const router = express.Router();
const sse = require("../sse");
const Item = require("../model/item");

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
router.get("/email/", async (req, res) => {
    const query = { email: req.body.email, paymentStatus:'pending' };

    try {
        const order = await Order.find(query);

        res.status(201).json({ order });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});
router.post("/createOrder", async (req, res) => {
    try {
        let { orderItems, email, orderType, tableNumber } = req.body

        orderStatus=paymentStatus='pending'
        const orderQuery = { tableNumber: tableNumber };

        const orderTable = await Table.findOne(orderQuery);
        orderAmount=0
        orderItems?.forEach(orderItem => {
            const itemAmount = orderItem.price * orderItem.quantity;
            orderAmount += itemAmount;
          });
        if (orderTable?.tableNumber != tableNumber) {
            res.status(500).json({ message: "Cannot place an order because of invalid table number" })
        }

        else {
            const order = await Order.create({
                orderItems, email, orderStatus, paymentStatus, orderType, orderAmount
            });
            await Table.updateOne({ tableNumber: tableNumber },
                {
                    $set: {
                        currentOrders: { orderItems, email, orderStatus, paymentStatus, orderType, orderAmount },
                        status: 'occupied'
                    }
                })
            sse.send(order, "order_created");

            res.status(200).json({ message: "Order Placed" })
            orderItems.forEach(orderedItem => {
                Item.findOneAndUpdate({ itemName: orderedItem.itemName }, { $inc: { 'orders': 1 } }).exec();
            });

        }
    } catch (err) {
        res.status(500).json("Server Error!")
        console.log(err);
    }
});

// Update an order by ID
router.put('/orderid/:id', async (req, res) => {
    try {
      const orderId = req.params.id;
      const updates = req.body;
      const options = { new: true }; // return the modified document
  
      const updatedOrder = await Order.findOneAndUpdate(orderId, updates, options);
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(updatedOrder);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  });
router.get("/allOrders", async (req, res) => {
    try {
        let data = await Order.find({})
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json("Server Error!")
    }
});


router.get('/total-order-amount', async (req, res) => {
  try {
    const orders = await Order.find({ paymentStatus: { $ne: 'complete' } });
    // total=0
    // orders?.orderItems?.forEach(item => {
    //     total=total+orderAmount
    // });
    const totalAmount = orders.reduce((total, order) => {
      return total + order.orderAmount;
    }, 0);
    res.status(200).json({ totalAmount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;


module.exports = router;