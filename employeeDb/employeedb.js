const mongoose = require('mongoose')
const subSchema = new mongoose.Schema({
    eID:{
        type:Number,
        required:true
    },
    eName:{
        type:String,
        required:true
    },
    eAddress:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    DOJ:{
        type:Date,
        required:true
    },
    DOR:{
        type:Date,
        required:false
    }
})

module.exports = mongoose.model('employeedb',subSchema)