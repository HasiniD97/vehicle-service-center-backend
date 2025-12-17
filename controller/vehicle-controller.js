const mysql = require('mysql2')

// DB connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'vehicle_service'
})

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err)
    return
  }
  console.log('MySQL connected (vehicle)')
})

/**
 * Save new vehicle
 * POST /
 */
const saveVehicle = (req, res) => {
  const {
    vehicleNo,
    vehicleBrand,
    vehicleModel,
    fk_nic,
    fk_vehicleTypeId
  } = req.body

  if (!vehicleNo || !vehicleBrand || !vehicleModel || !fk_nic || !fk_vehicleTypeId) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const sql = `
    INSERT INTO vehicle
    (vehicleNo, vehicleBrand, vehicleModel, fk_nic, fk_vehicleTypeId)
    VALUES (?, ?, ?, ?, ?)
  `

  connection.query(
    sql,
    [vehicleNo, vehicleBrand, vehicleModel, fk_nic, fk_vehicleTypeId],
    (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: 'Failed to save vehicle' })
      }
      res.status(201).json({ message: 'Vehicle saved successfully' })
    }
  )
}

/**
 * Update vehicle by vehicleNo
 * PUT /:vehicleno
 */
const updateVehicle = (req, res) => {
  const paramVehicleNo = req.params.vehicleno
  const {
    vehicleNo,
    vehicleBrand,
    vehicleModel,
    fk_nic,
    fk_vehicleTypeId
  } = req.body

  if (!vehicleNo || !vehicleBrand || !vehicleModel || !fk_nic || !fk_vehicleTypeId) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const sql = `
    UPDATE vehicle
        SET vehicleNo = ?,
        vehicleBrand = ?,
        vehicleModel = ?,
        fk_nic = ?,
        fk_vehicleTypeId = ?
    WHERE vehicleNo = ?
  `

  connection.query(
    sql,
    [vehicleNo,vehicleBrand, vehicleModel, fk_nic, fk_vehicleTypeId, paramVehicleNo],
    (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: 'Failed to update vehicle' })
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Vehicle not found' })
      }

      res.json({ message: 'Vehicle updated successfully' })
    }
  )
}

/**
 * Delete vehicle by vehicleNo
 * DELETE /:vehicleno
 */
const deleteVehicle = (req, res) => {
  const vehicleNo = req.params.vehicleno

  const sql = 'DELETE FROM vehicle WHERE vehicleNo = ?'

  connection.query(sql, [vehicleNo], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to delete vehicle' })
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vehicle not found' })
    }

    res.json({ message: 'Vehicle deleted successfully' })
  })
}

/**
 * Get all vehicles
 * GET /
 * Includes customer & vehicle type details
 */
const getAllVehicles = (req, res) => {
  const sql = `
    SELECT 
      v.vehicleNo,
      v.vehicleBrand,
      v.vehicleModel,
      v.fk_nic,
      c.customerName,
      c.phone,
      v.fk_vehicleTypeId,
      vt.vehicleTypeName
    FROM vehicle v
    JOIN customer c ON v.fk_nic = c.nic
    JOIN vehicle_type vt ON v.fk_vehicleTypeId = vt.vehicleTypeId
  `

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to fetch vehicles' })
    }

    res.json(results)
  })
}

/**
 * Get vehicle by vehicleNo
 * GET /get_by_vehicleno/:vehicleno
 */
const getVehicleByVehicleNo = (req, res) => {
  const vehicleNo = req.params.vehicleno

  const sql = `
    SELECT *
    FROM vehicle
    WHERE vehicleNo = ?
  `

  connection.query(sql, [vehicleNo], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to fetch vehicle' })
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' })
    }

    res.json(results[0])
  })
}

/**
 * Get vehicles by customer NIC
 * GET /get_by_nic/:nic
 */
const getVehicleByNic = (req, res) => {
  const nic = req.params.nic

  const sql = `
    SELECT *
    FROM vehicle
    WHERE fk_nic = ?
  `

  connection.query(sql, [nic], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to fetch vehicles' })
    }

    res.json(results)
  })
}

module.exports = {
  saveVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleByVehicleNo,
  getVehicleByNic
}
