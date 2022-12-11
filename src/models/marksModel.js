const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const marksSchema = new mongoose.Schema({
    studentName:{
        type: String,
        require: true,
        trim: true
    },
    subject:{
        type: String,
        enum: ['Accounts','Economics','Business','English','Hindi'],
        require: true,
        trim: true
    },
    marks:{
        type: Number,
        require: true,
        trim: true
    },
    userId:{
      type: ObjectId,
      ref: 'user',
     // require: true,
      trim: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });


module.exports = mongoose.model('marks', marksSchema)



