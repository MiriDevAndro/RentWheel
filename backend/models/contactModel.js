const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: { 
        type: String,
        require: true,
        trim: true
    },
    mes: { 
        type: String,
        require: true,
        trim: true
    },
    read:{
        type: String,
        default: 'false'
    }
})

const Items = mongoose.model("Contact", itemSchema)
module.exports = Items