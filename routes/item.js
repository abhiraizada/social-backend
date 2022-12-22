const Item = require("../model/Item");
const Order = require("../model/order");
const Table = require("../model/table");
const Seq = require("../model/seq");
const express = require('express')
const router = express.Router();
const sse = require("../sse");


router.get("/itemId/:id", async (req, res) => {
    const query = { itemId: req.params.id };

    try {
        const item = await Item.findOne(query);

        res.status(201).json({ item });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.post("/createItem", async (req, res) => {
    try {
        let { itemName, price, availability, description, category, subCategory, offer, stock, prepTime, tags, options, nutrition, itemType, productionCost } = req.body

        const item = await Item.create({
            itemName, price, availability, description, category,subCategory, offer, stock, prepTime, tags, options, nutrition, itemType, productionCost
        });

        res.status(200).json({ message: "Item created" })

    } catch (err) {
        res.status(500).json("Server Error!")
        console.log(err);
    }
});

router.get("/allItems", async (req, res) => {
    try {
        let data = await Item.find({})
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json("Server Error!")
    }
});

module.exports = router;