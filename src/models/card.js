let mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let cardSchema = new mongoose.Schema({
    cardNumber:{
        type: String
    },
    cardType:{
        type: String,
        enum: ['Regular','Special'],
        require: true
    },
    customerName:{
        type: String,
        require: true
    },
    status:{
        type: String,
        enum: ['Active','InActive'],
        default: 'Active'
    },
    vision:{
        type: String,
    },
    customerId:{
        type: ObjectId,
        ref: 'Customer',
    }
},{timestamps: true})

module.exports = mongoose.model('Card',cardSchema)