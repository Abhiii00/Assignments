const userModel = require("../models/userModel.js")
const jwt = require('jsonwebtoken')
let v = require("../validations/validation.js")
const bcrypt = require("bcrypt")


//---------------------------|| CREATE USER ||-------------------------------

const createUser = async function(req,res){   // COMPLETED
    try {
        let data = req.body
        let {fname, lname, email, mobile, password} = data

        if(!v.isvalidRequest(data)) return res.status(400).send({ status: false, message: "please input data" })
 
        if (!v.isValidSpace(fname)) return res.status(400).send({ status: false, message: `fname is mandatory` })
        if (!v.isValidName(fname)) return res.status(400).send({ status: false, message: `fname is must in char` })
  
        if (!v.isValidSpace(lname)) return res.status(400).send({ status: false, message: `lname is mandatory` })
        if (!v.isValidName(lname)) return res.status(400).send({ status: false, message: `lname is must in char` })         
      
        if (!email) return res.status(400).send({ status: false, message: "please provide email" })
        if (!v.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })
        if (await userModel.findOne({ email: email })) return res.status(400).send({ status: false, message: `email already exist` })

        if (!mobile) return res.status(400).send({ status: false, message: "please provide mobile number" })
        if (!v.isValidMobile(mobile)) return res.status(400).send({ status: false, message: `enter a valid phone number` })
        if (await userModel.findOne({mobile: mobile })) return res.status(400).send({ status: false, message: `phone already exist` })
  
        if (!password) return res.status(400).send({ status: false, message: "please enter password" })
        if (!v.isValidPass(password)) return res.status(400).send({ status: false, message: `enter a valid password-"password length should be 8 min - 15 max"` })

         //hashing
        const salt = await bcrypt.genSalt(10)
        //console.log(salt)
        const hashpass = await bcrypt.hash(data.password, salt)
       // console.log(hashpass)

        data.password = hashpass

        let userData = await userModel.create(data)
        return res.status(201).send({ status: true, msg: "success", data: userData })// 
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}


//---------------------------|| LOGIN USER ||-------------------------------

const loginUser = async function(req,res){
    try {
        const requestBody = req.body
        if (!v.isvalidRequest(requestBody)) return res.status(400).send({ status: false, message: `data is mandatory` })
  
        const { email, password } = requestBody
  
        if (!email) return res.status(400).send({ status: false, message: "please provide email" })
        if (!v.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })
  
        if (!password) return res.status(400).send({ status: false, message: "please provide password" })
        if (!v.isValidPass(password)) return res.status(400).send({ status: false, message: `enter a valid password-"password length should be 8 min - 15 max"` })
  
        let user = await userModel.findOne({ email: email });
        if (!user) return res.status(404).send({ status: false, message: "no user found-invalid user" });
  
        let passCheck = await bcrypt.compare(password, user.password)
        if (!passCheck) return res.status(400).send({ status: false, message: "invalid password" });
  
        let token = jwt.sign({userId: user._id.toString()},"tailWebs-Assignment",{ expiresIn: "12h" });
  
        return res.send({ status: true, message: "Success", data: token});
  
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}


module.exports = {createUser, loginUser}