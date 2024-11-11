const express = require("express")

const app = express()


app.get('/category', async (req, res) => {
    try {
        res.status(200).send({category: ['Mercedes','Ferrari','Lamborghini','BMW','Audi','Ford','Bentley','Porsche','Range Rover','Toyota']})
    } catch (err) {
        res.status(500).send({mes: err.message})
    }
})


module.exports = app