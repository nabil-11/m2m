

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
  
    verifyImage: {
        type: String,
        
    },
    location: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: true
    },
    phone: {
        type: String,
       
    },



    

}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)