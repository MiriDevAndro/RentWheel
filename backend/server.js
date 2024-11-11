const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const session = require("express-session")
const contactRoute = require("./routes/contactRoute")
const allCars = require("./routes/carsRoute")
const category = require("./routes/categoryRoute")
const authRoute = require("./routes/authRouter")
const path = require("path")
const app = express()

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    exposedHeaders: ["set-cookie"],
}))

app.use(session({
    secret: "thiispassword",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

app.use(express.json({ limit: "1000mb", extended: true }));

app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect('mongodb+srv://mirjansyla11:miri@cluster0.y0drv.mongodb.net/RENT?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log("DB start")
})
.catch((e) => { console.log("Not started"+e) })

app.use(contactRoute)
app.use(allCars)
app.use(category)
app.use(authRoute)

// Cache
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.listen(5000, () => {
    console.log("Server created at port 5000!")
})