let mongoose = require('mongoose')


let customerSchema = new mongoose.Schema({
    fname:{
        type: String,
        require: true
    },
    lname:{
        type: String,
    },
    mobile:{
        type: String,
        require: true
    },
    DOB:{
        type: Date,
        require: true
    },
    email:{
        type: String,
    },
    address:{
        type: String,
        require: true
    },
    customerId:{
        type: String,
        require: true
    },
    status:{
        type: String,
        enum: ['Active','InActive']
    },
    isDeleted:{
        type: Boolean,
        default: false,
    }
},{timestamps: true})

module.exports = mongoose.model('Customer',customerSchema)