const express = require("express")
const itemModel = require("../models/contactModel")
const userModel = require("../models/userModel")

const app = express()

app.post('/createContact',async (req, res) => {
    try {
        const newItem = new itemModel(req.body)
        newItem.save()
        console.log(req.body)
        res.status(200).send({mes: 'success'})
    } catch (err) {
        res.status(500).send({mes: 'error'})
    }
})

app.post('/allContact', async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await userModel.findById(userId);
        if(user.username !== 'admin'){
            return res.status(401).send({mes: 'Unauthorized'})
        }
        const allItems = await itemModel.find({})
        res.status(200).send(allItems)
    } catch (err) {
        res.status(500).send({mes: err.message})
    }
})

app.post('/Contact', async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await userModel.findById(userId);
        if(user.username !== 'admin'){
            return res.status(401).send({mes: 'Unauthorized'})
        }
        const allItems = await itemModel.find({read:'false'})
        res.status(200).send(allItems)
    } catch (err) {
        res.status(500).send({mes: err.message})
    }
})

app.post('/upContact', async (req, res) => {
    try {
        const userId = req.body.userId;

        const user = await userModel.findById(userId);
        if(user.username !== 'admin'){
            return res.status(401).send({mes: 'Unauthorized'})
        }
        const allItems = await itemModel.updateMany({read:'false'},{read:'true'})
        res.status(200).send(allItems)
    } catch (err) {
        res.status(500).send({mes: err.message})
    }
})

module.exports = app