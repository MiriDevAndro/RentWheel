const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
        unique: false
    },
    price:{
        type: String,
        required: true,
        trim: true,
        unique: false
    },
    des: { 
        type: String,
        require: true,
        trim: true,
        unique: false
    },
    image: {
        type: String,
        unique: false
    },
    image2: {
        type: String,
        unique: false
    },
    image3: {
        type: String,
        unique: false
    },
    image4: {
        type: String,
        unique: false
    },
    tipi:{
        type: String,
        required:  true,
        trim: true,
        unique: false
    },
    rate:{
        type: String,
        required:  false,
        trim: true,
        unique: false
    },
    specs:{
        type: String,
        required:  false,
        trim: true,
        unique: false
    },
    ownerItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    }
})

const Items = mongoose.model("Cars", itemSchema)
module.exports = Items