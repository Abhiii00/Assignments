const express = require('express');
const router = express.Router();

//---------------------------|| CONTROLLERS ||-------------------------------

let customerController = require('../controllers/customer')
let cardController = require('../controllers/card')

//---------------------------|| Router's ||-------------------------------

router.post('/createCustomer',customerController.createCustomer)
router.get('/getCustomer',customerController.getCustomer)
router.delete('/deleteCustomer/:customerId',customerController.deleteCustomer)

router.post('/createCard',cardController.createCard)
router.get('/getCard',cardController.getCard)


//---------------------------|| FOR CHECKING THE ENDPOINT ||-------------------------------

router.all("/*", function (req, res) {
    res.status(400).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct !!!"
    })
})




module.exports = router