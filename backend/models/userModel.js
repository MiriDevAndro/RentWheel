// Therritja e librarise mongoose qe do te sherbeje per krijimi e modeleve (skima(Schema) ose tabela)
const mongoose = require('mongoose')
// Krijohet schema; tabela; modele;
// Informacionet do te ruhen ne formen e nje objekti
// Key: username, email, password;(mund te vendosin edhe informacione te tjera){karakteristikat}
// Emrat e key-ve i vendosni ju
const userSchema = new mongoose.Schema({
    // Analogji: key jane emertimet e kolonave ne nje tabele
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
},
    // Data e krijimit   
    { timestamps: true })
// Krijimi i modelit ne mongoDB
const User = mongoose.model('userModel', userSchema)
//Exportimi i modelit
module.exports = User