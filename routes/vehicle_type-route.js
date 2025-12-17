const express = require('express')
const router = express.Router()

const {
    getAllVehicleTypes,
} = require('../controller/vehicle_type-controller')

router.get('/', getAllVehicleTypes);

module.exports = router;