const marksModel = require("../models/marksModel.js")
let v = require("../validations/validation.js")


//---------------------------|| CREATE STUDENTS DATA ||-------------------------------

const createMarks = async function(req,res){
    try{
       let data = req.body
       let userId = req.params.userId

       let {studentName, subject, marks} = data

       if(!v.isvalidRequest(data)) return res.status(400).send({ status: false, message: "please input data" })

       if (!v.isValidSpace(studentName)) return res.status(400).send({ status: false, message: `studentName is mandatory0` })
       if (!v.isValidName(studentName)) return res.status(400).send({ status: false, message: `studentName is must in char` })
  
       if(!v.isValidSpace(subject))  return res.status(400).send({status: false, msg: "subject is required"})
       if(!v.isValidSubject(subject)) return res.status(400).send({ status: false, msg: "subjects is only include ['Accounts','Economics','Business','English','Hindi'] " })

       if(!v.isValidSpace(marks))  return res.status(400).send({status: false, msg: "marks is required"})
       if(!v.isValidNumber(marks)) return res.status(400).send({status: false, msg: "please enter marks only in Numbers and between 0 to 100 only"})
    
       data.userId = userId
    
       let stuAlreadyCreated = await marksModel.findOne({studentName: studentName, subject: subject, userId: userId, isDeleted: false})
       if(stuAlreadyCreated){
       let alreadyRegMarks = stuAlreadyCreated.marks
       let add = alreadyRegMarks + marks
       stuAlreadyCreated.marks = add 
       return res.status(201).send({status:true, msg: "success", data:stuAlreadyCreated})
       }

       let stuData = await marksModel.create(data)
       return res.status(201).send({status: true, msg: "success", data: stuData})
    }catch(err){
        return res.status(500).send({ status: false, message: err.message })
    }
}


//---------------------------|| GET STUDENTS BY FILTER ||-------------------------------

const getStudentDetails = async function(req,res){  // COMPLETED
    try{
       let data = req.query
       let userId = req.params.userId

       if(!data) return res.status(400).send({status: false, msg: "please input some data to filter"})
       if (data._id === "")  return res.status(400).send({ status: false, msg: "please enter _id value to filter" })
       if (data.studentName === "")  return res.status(400).send({ status: false, msg: "please enter studentName value to filter" })
       if (data.subject === "")  return res.status(400).send({ status: false, msg: "please enter subject value to filter" })

       let studentData = await marksModel.findOne({userId: userId, isDeleted: false, ...data })
       return res.status(200).send({status: true, msg: "success", data: studentData})
    }catch(err){
       return res.status(500).send({ status: false, message: err.message })
    }
}

//---------------------------|| UPDATE STUDENT ||-------------------------------

 const updateStudentDetails = async function(req,res){
    try {
        let userId = req.params.userId
        let studentId = req.params.studentId
        let data = req.body

        if(!studentId) return res.status(400).send({ status: false, message: "please provide a studentId in params" })
        if(!v.isValidObjectId(studentId)) return res.status(400).send({ status: false, msg: "please enter a valid studentId" })
        let findStudentId = await marksModel.findOne({userId: userId, _id: studentId, isDeleted: false})
        if (!findStudentId) return res.status(404).send({ status: false, msg: "studentId doesn't exists" })

        let {studentName, subject, marks} = data
   
        if(!v.isvalidRequest(data)) return res.status(400).send({ status: false, message: "please input data" })
        if(studentName){
        if (!v.isValidName(studentName)) return res.status(400).send({ status: false, message: `studentName is must in char` })
        }

        if(subject){
        if(!v.isValidSubject(subject)) return res.status(400).send({ status: false, msg: "subjects is only include ['Accounts','Economics','Business','English','Hindi'] " })
        } 

        if(marks){
        if(!v.isValidNumber(marks)) return res.status(400).send({status: false, msg: "please enter marks only in Numbers"})
        }   

        let updatedData = await marksModel.findOneAndUpdate({ _id: findStudentId._id},{$set:{...data}},{new: true});
        return res.status(200).send({ status: true, message: "student sucessfully updated", updatedData });
    
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//---------------------------|| DELETE STUDENT ||-------------------------------

const deleteStudent = async function (req, res) {    // COMPLETED
    try {
        let userId = req.params.userId
        let studentId = req.params.studentId

        if(!studentId) return res.status(400).send({ status: false, message: "please provide a studentId in params" })
        if(!v.isValidObjectId(studentId)) return res.status(400).send({ status: false, msg: "please enter a valid studentId" })

        let findStudentId = await marksModel.findOne({userId: userId, _id: studentId})
        if (!findStudentId) return res.status(404).send({ status: false, msg: "studentId doesn't exists" })
        if (findStudentId.isDeleted == true) return res.status(404).send({ status: false, message: "student is already deleted" })
    
        let deleteStudent = await marksModel.findByIdAndUpdate({ _id: findStudentId._id }, { $set: { isDeleted: true } }, { new: true });                      
        return res.status(200).send({ status: true, message: "student sucessfully deleted", deleteStudent });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



module.exports = {createMarks, getStudentDetails, updateStudentDetails, deleteStudent }
