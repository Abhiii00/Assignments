let customerModel = require('../models/customer')
const v = require('../validations/validation')
let generateId = require('unique-random-number-gen').randomNumber


let createCustomer = async function(req, res){
    try{
        let data = req.body
        let {mobile, email} = data
        if(!v.isvalidRequest(data)) return res.status(400).send({ status: false, message: "please input some data" })
        if(!v.isValidMobile(mobile)) return res.status(400).send({status: false, msg: 'please enter valid mobile number'})
        if(!v.isValidEmail(email)) return res.status(400).send({status: false, msg: 'please enter valid Email Id'})
        data.customerId = generateId()
        let createData = await customerModel.create(data)
        return res.status(201).send({status: true, msg: 'Success', data: createData})
    }catch(err){
       return res.status(500).send({status: true, msg: err.message}) 
    }
}


let getCustomer = async function(req, res){
    try{
        let status = req.query.status
        let getData = await customerModel.find({status: status, isDeleted: false})
        return res.status(200).send({status: true, msg: 'Success', data: getData})
    }catch(err){
       return res.status(500).send({status: true, msg: err.message}) 
    }
}


let deleteCustomer = async function(req, res){
    try{
        let customerId = req.params.customerId
        if(!customerId) return res.status(400).send({ status: false, message: "please provide a customerId in params" })
        if(!v.isValidObjectId(customerId)) return res.status(400).send({ status: false, msg: "please enter a valid customerId" })

        let findCustomer = await customerModel.findOne({_id: customerId})
        if(!findCustomer) return res.status(400).send({status: false, msg: 'No Customer Foung'})
        if (findCustomer.isDeleted == true) return res.status(404).send({ status: false, message: "Customer already deleted" })
    
        let deleteCustomer = await customerModel.findByIdAndUpdate({ _id: customerId }, { $set: { isDeleted: true } }, { new: true });                      
        return res.status(200).send({ status: true, message: "customer sucessfully deleted", deleteCustomer });
    }catch(err){
       return res.status(500).send({status: true, msg: err.message}) 
    }
}


module.exports = {createCustomer, getCustomer, deleteCustomer}
