const express = require('express')
const router = express.Router()

const {
    saveServiceLog,
    getServiceLogByServiceID 
} = require('../controller/service_log-controller')


router.post('/', saveServiceLog);
router.get('/get_by_service_id/:sid', getServiceLogByServiceID);

module.exports = router;