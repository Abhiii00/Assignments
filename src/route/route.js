const express = require('express');
const router = express.Router();

//---------------------------|| CONTROLLERS ||-------------------------------

const userController = require("../controllers/userController.js")       
const marksController = require("../controllers/marksController.js")    

//---------------------------|| CONTROLLERS ||-------------------------------

const mid = require("../middleware/middleware.js")       

//---------------------------|| USER API'S ||-------------------------------

router.post("/user/register",userController.createUser)
router.post("/user/login",userController.loginUser)

//---------------------------|| MARKS API'S ||-------------------------------

router.post("/marks/:userId", mid.authentication, mid.Authorisation, marksController.createMarks)
router.get("/marks/:userId", mid.authentication, mid.Authorisation,marksController.getStudentDetails)
router.put("/marks/:userId/:studentId", mid.authentication, mid.Authorisation, marksController.updateStudentDetails)
router.delete("/marks/:userId/:studentId", mid.authentication, mid.Authorisation, marksController.deleteStudent)


//---------------------------|| FOR CHECKING THE ENDPOINT ||-------------------------------

router.all("/*", function (req, res) {
    res.status(400).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct !!!"
    })
})




module.exports = router