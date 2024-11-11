// Importimi i framework express
const express = require('express')
// Therritja e metodava te express
const app = express()

const mongoose = require('mongoose')
// Autentifikimi i userve - JSON Web Token
// Gjeneron nje key per user-in i cili logohet, lexohet nga server
// Key-ja (token) ruhet tek browser ne memorie si: cookies, session ose localStorage 
// dhe perdoret per shkembim e informacioneve
const jwt = require('jsonwebtoken');
// Ka nevoje per nje element secret
// Vleren e variablit secret e vendosni ju 
const secret = 'asdfe45we45w345wegw345werjktjwertkjfdgfgfsgf';
// Importimi i librarise cookie-parser per ruajtjen e key-se/token ne cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser()); /// cookieParser
// Importimi i modelit user
const userModel = require('../models/userModel')
// Importimi i librarise bcrypt per inkriptimin e password
const bcrypt = require("bcrypt");
// Gjenerimi i 10 karaktereve qe do te perdoren per inkriptimin  e password-it
// Mund te vendosni nje numer me te madh ose me te vogel
const salt = bcrypt.genSaltSync(10);

// register - Perdoret metoda post
app.post('/register', async (req, res) => {
    // Marrja dhe ruajtja te dhenat nga frontend (input-et e form-es ne React)
    const userInfo = req.body
    try {
        // Disa validime nga backend
        if (userInfo.username == " " && userInfo.email == "" & userInfo.password == "") {
            return (
                res.status(404).send("Field are empty")
            )
        }
        if (userInfo.password < 3) {
            return (
                res.status(404).send("Short password")
            )
        }
        // Kontrolli nese ekziston nje user me email e marre nga input
        // Mund te perdoren edhe te dhena te tjera nga modeli
        // exec() - metode e mongoose
        let foundUser = await userModel.findOne({ usename: userInfo.username }).exec()
        // Ne varesi te rezultatit ndodhin veprimet
        // Nese user-i ekziston
        if (foundUser) {
            // Shfaqet mesazhi
            return res.status(400).send("This user exist")
        } else {
            // Shtimi i user te ri
            //  Informacionet e marra nga frontend kalohen te key-te perkatese te modelit
            let newUser = new userModel({
                // Key-te e modelit: informacionet e marra nga req.body
                username: userInfo.username,
                email: userInfo.email,
                // Behet inkriptimi i password, ndryshe hashimi duke perdorur paketen bcrypt
                password: bcrypt.hashSync(userInfo.password, salt),
            })
            // Ruajtja ne mongo DB
            console.log(newUser)
            await newUser.save()
            // Afishimi i mesazhit te suksesit
            return res.status(200).send('User Created ' + newUser)
        }
    } catch (err) {
        // Nese ka gabime nga ana e funksionit
        console.log('Something is wrong ' + err)
        res.status(500).send('Something is wrong ' + err)
    }
})

// login - Perdoret metoda post
app.post('/login', async (req, res) => {
    // Merrja dhe ruajtja te dhenat nga frontend (input-et e form-es ne React)
    const userData = req.body;
    // console.log(userData)
    // Kontrolli nese user-i ekziston
    const findUser = await userModel.findOne({ username: userData.username }).exec();
    try {
        // Nese user-i gjendet
        if (findUser) {
            // Krahasohet password i marre nga frontend me ate te gjetur ne databaze
            // Krahasimi behet duke perdorur librarine bcrypt
            const passOk = bcrypt.compareSync(userData.password, findUser.password);
            // Nese password-et jane te njejte
            if (passOk) {
                // Perdoren metodat e librarise jsonwebtoken per te gjeruar nje token (kod) unik
                jwt.sign({username: findUser.username, email: findUser.email, id: findUser._id }, secret, {}, (err, token) => {
                    // Nese ka probleme me token shfaqet gabimi
                    if (err) {
                        console.error('Error generating token:', err);
                        res.status(500).send("Something is wrong");
                    } else {
                        // Gjenerohet token
                        // Verifikohet gjenerimi i token
                        console.log('Generated token:', token);
                        // Ruajtja e token ne memorien cookie dhe kalim tek userContext(Frontend)
                        // Vetem nese perdoret protokolli http
                        res.cookie('token', token, { httpOnly: true }).json({
                            id: findUser._id,
                            username: findUser.username,
                            email: findUser.email
                        });
                    }
                });
            } else {
                // Gabimi" nese vendosen kredencialet e gabuara
                res.status(400).send('Invalid credentials');
            }
        } else {
            // Gabimi: nese nuk gjendet user-i
            res.status(404).send('User not found');
        }
    } catch (err) {  // Nese ka gabime nga ana e funksionit
        res.status(500).send("Something is wrong " + err);
    }
});

// Auth user - infot e user-it te loguar. Perdoret metoda get
app.get('/user', (req, res) => {
    // Merr vleren e token nga frontend
    const { token } = req.cookies;
    // Kontrollon nese token e therritur eshte i njejte me token e user-it te loguar
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            // Nese jo shfaqet gabimi
            console.log('Unauthorized')
            return res.status(401).send('Unauthorized');
        }
        // Kalimi i infomacionit nese token eshte i sakte
        res.json(info);
    });
});

// Logout - Perdoret metoda post
app.post('/logout', (req, res) => {
    console.log('Logout request received');
    // Fshirja e token-it, logout user-i
    res.cookie('token', '', { expires: new Date(0), httpOnly: true }).json('ok');
});
//Exportimi i funksioneve


app.post('/allUsers',async  (req,res)=>{
    try{
        const adminID = req.body.userId;
        // console.log(req.body)
        if (!adminID || !mongoose.Types.ObjectId.isValid(adminID)) {
            console.log("Invalid userId");
            return res.status(400).send("Invalid userId");
        }
        const user = await userModel.findById(adminID);
        if (!user) {
            console.log("User not found");
            return res.status(404).send("User not found");
        }
        if(user.username  !== 'admin'){
            return res.status(401).send({mes: 'Unauthorized'})
        }

        const allItems = await userModel.find({})
        
        return res.status(200).send(allItems)

    }catch(er){
        console.log(er.message)
        return res.status(500).send({mes: er.message})
    }
})



app.post('/userData/:id',async  (req,res)=>{
    try{
        
        const userID = req.params.id
        const adminID = req.body.userId;
        
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
        const user = await userModel.findById(userID);
        
        if( user._id == userID || admin.username == 'admin'){
            return res.status(200).send(user)
        }else{
            return res.status(401).send({mes: 'Unauthorized'})
        }

        

    }catch(er){
        console.log(er.message)
        return res.status(500).send({mes: er.message})
    }
})





module.exports = app