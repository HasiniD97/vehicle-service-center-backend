const express = require('express')
const router = express.Router()

const {
    saveVehicle,
    updateVehicle,
    deleteVehicle,
    getAllVehicles,
    getVehicleByVehicleNo,
    getVehicleByNic
} = require('../controller/vehicle-controller')

router.post('/', saveVehicle);
router.put('/:vehicleno', updateVehicle);
router.delete('/:vehicleno', deleteVehicle);
router.get('/', getAllVehicles);
router.get('/get_by_vehicleno/:vehicleno', getVehicleByVehicleNo);
router.get('/get_by_nic/:nic', getVehicleByNic);

module.exports = router;
