const express = require('express')
const router = express.Router()

const {
    getAllStatus,
} = require('../controller/status-controller')

router.get('/', getAllStatus);

module.exports = router;