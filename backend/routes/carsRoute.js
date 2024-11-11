const express = require("express")
const itemModel = require("../models/carsModel")
const userModel = require("../models/userModel")
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const multer = require('multer')
const path = require("path")
const mongoose = require('mongoose')

const app = express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
})
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png','image/webp','image/avif'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
let upload = multer({ storage, fileFilter })

// get all
app.get('/allCars', async (req, res) => {
    try {
        const allItems = await itemModel.find({})
        res.status(200).send(allItems)
    } catch (err) {
        res.status(500).send({mes: err.message})
    }
})

app.get('/car/:id', async (req, res) => {
    try {
        const itemID = req.params.id
        const oneItem = await itemModel.findById({_id: itemID })
        res.status(200).send(oneItem)
    } catch (err) {
        res.status(500).send({mes: err.message})
    }
})

app.post('/allCarsOwner/:id', async (req, res) => {
    try {
        const userID = req.params.id
        const adminID = req.body.userId;
        // console.log(req.body)
        if (!adminID || !mongoose.Types.ObjectId.isValid(adminID)) {
            console.log("Invalid userId");
            return res.status(400).send("Invalid userId");
        }
        const admin = await userModel.findById(adminID);
        if (!admin) {
            console.log("User not found");
            return res.status(404).send("User not found");
        }
        // if(admin.username  !== 'admin'){
        //     return res.status(401).send({mes: 'Unauthorized'})
        // }
        if(admin.username == 'admin' || admin._id == userID){
            const allItems = await itemModel.find({ownerItem: userID})
        
            return res.status(200).send(allItems)
        }

        return res.status(401).send({mes: 'Unauthorized'})
        
    } catch (err) {
       return res.status(500).send({mes: err.message})
    }
})


// new car
app.post('/addCars',upload.fields([{name:'image',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]), async (req, res) => {
    try {
        const userId = req.body.userId;
        
        if(!req.body.tipi || req.body.tipi == undefined || req.body.tipi == ''){
            return res.status(400).send("Car type required!");
        }

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            console.log("Invalid userId");
            return res.status(400).send("Invalid userId");
        }

        const user = await userModel.findById(userId);
        if (!user) {
            console.log("User not found");
            return res.status(404).send("User not found");
        }

        var lobo = {...req.body,image: req.files.image[0].filename,ownerItem: userId}
        if(req.files.image2){
            lobo  = {...req.body,image: req.files.image[0].filename,image2: req.files.image2[0].filename,ownerItem: userId}
        }
        if(req.files.image3){
            lobo  = {...req.body,image: req.files.image[0].filename,image2: req.files.image2[0].filename,image3: req.files.image3[0].filename,ownerItem: userId}
        }
        if(req.files.image4){
            lobo  = {...req.body,image: req.files.image[0].filename,image2: req.files.image2[0].filename,image3: req.files.image3[0].filename,image4: req.files.image4[0].filename,ownerItem: userId}
        }
        // console.log(lobo)//l
        const newItem = new itemModel(lobo)
        newItem.save()
        res.status(200).send({mes: 'ok'})
    } catch (err) {
        res.status(500).send({mes: err.message})
        console.log({addError: err.message})
    }
})

// delete car by id
app.post('/delCar/:id', async (req, res) => {
    try {

        const userId = req.body.userId;
        
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            console.log("Invalid userId");
            return res.status(400).send("Invalid userId");
        }

        const user = await userModel.findById(userId);
        if (!user) {
            console.log("User not found");
            return res.status(404).send("User not found");
        }
        const itemID = req.params.id

        const oneItem = await itemModel.findById({_id: itemID})
        
        if( oneItem.ownerItem == userId || user.username  == 'admin' ){

            fs.unlink('./images/'+oneItem.image,(er)=>{
                console.log(er)
            })
            fs.unlink('./images/'+oneItem.image2,(er)=>{
                console.log(er)
            })
            fs.unlink('./images/'+oneItem.image3,(er)=>{
                console.log(er)
            })
            fs.unlink('./images/'+oneItem.image4,(er)=>{
                console.log(er)
            })

            await itemModel.deleteOne({_id: itemID})
        }else{
            return res.status(401).send({mes: 'Unauthorized'})
        }

        res.status(200).send({mes: 'ok'})
    } catch (err) {
        res.status(500).send({mes: err.message})
    }
})


// update car 

app.patch('/updateCar/:id',upload.fields([{name:'image',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]), async (req, res) => {
    try {
        const userId = req.body.userId;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            console.log("Invalid userId");
            return res.status(400).send("Invalid userId");
        }

        const user = await userModel.findById(userId);
        if (!user) {
            console.log("User not found");
            return res.status(404).send("User not found");
        }

        const itemID = req.params.id

        const oneItem = await itemModel.findById({_id: itemID})
        
        if(user.username  == 'admin' || oneItem.ownerItem == userId){
            const infoUpdate = { ...req.body }
            if (req.files) {
                if(req.files.image != undefined){
                    infoUpdate.image = req.files.image[0].filename;
                }
                if(req.files.image2 != undefined){
                    infoUpdate.image2 = req.files.image2[0].filename;
                }
                if(req.files.image3 != undefined){
                    infoUpdate.image3 = req.files.image3[0].filename;
                }
                if(req.files.image4 != undefined){
                    infoUpdate.image4 = req.files.image4[0].filename;
                }
            }
            const itemUpdated = await itemModel.findByIdAndUpdate(
                {_id: itemID},
                { $set: infoUpdate },
                { new: true }
            );
            res.status(200).send(itemUpdated)
        }else{
            return res.status(401).send({mes: 'Unauthorized'})
        }
        
        // const infoUpdate = { ...req.body }

        // if (req.files) {
        //     if(req.files.image != undefined){
        //         infoUpdate.image = req.files.image[0].filename;
        //     }
        //     if(req.files.image2 != undefined){
        //         infoUpdate.image2 = req.files.image2[0].filename;
        //     }
        //     if(req.files.image3 != undefined){
        //         infoUpdate.image3 = req.files.image3[0].filename;
        //     }
        //     if(req.files.image4 != undefined){
        //         infoUpdate.image4 = req.files.image4[0].filename;
        //     }
        // }

        // const itemUpdated = await itemModel.findByIdAndUpdate(
        //     {_id: itemID},
        //     { $set: infoUpdate },
        //     { new: true }
        // );
        // res.status(200).send(itemUpdated)
        
    } catch (err) {
        res.status(500).send({mes: err.message})
        console.log({mes: err.message})
    }
})

// rate car 

app.patch('/rate/:id', async (req, res) => {
    try {
        const itemID = req.params.id
        const infoUpdate = { ...req.body }
// ((1*x)+(2*x)+(3*x)+(4*x)+(5*x))/vota ((1*2)+(2*2)+(3*2)+(4*2)+(5*2))/10=3
        const itemUpdated = await itemModel.findByIdAndUpdate(
            { _id: itemID },
            { $set: infoUpdate },
            { new: true }
        );
        res.status(200).send(itemUpdated)

    } catch (err) {
        res.status(500).send({mes: err.message})
        console.log({mes: err.message})
    }
})



module.exports = app