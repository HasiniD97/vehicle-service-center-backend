const express = require('express')
const router = express.Router()

const {
    saveService,
    updateService,
    getAllServices,
    getServiceByServiceId,
    getServiceByVehicleNo
} = require('../controller/service-controller')


router.post('/', saveService);
router.put('/:sid',updateService);
router.get('/', getAllServices);
router.get('/get_by_serviceid/:sid', getServiceByServiceId);
router.get('/get_by_vehicle_no/:vehicleno', getServiceByVehicleNo);

module.exports = router;