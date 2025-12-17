const express = require('express')
const router = express.Router()

const {
    saveCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomerByNIC,
    getCustomerByPhone 
} = require('../controller/customer-controller')


router.post('/', saveCustomer);
router.put('/:nic',updateCustomer);
router.delete('/:nic', deleteCustomer);
router.get('/get_by_nic/:nic', getCustomerByNIC);
router.get('/get_by_phone/:phone', getCustomerByPhone);
router.get('/', getAllCustomers);

module.exports = router;