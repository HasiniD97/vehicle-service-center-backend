const mysql = require('mysql2')

// DB connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'vehicle_service',
  dateStrings: true 
})

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err)
    return
  }
  console.log('MySQL connected (service)')
})

/**
 * Save new service
 * POST /
 */
const saveService = (req, res) => {
    const { serviceDate, fk_vehicleNo, fk_statusId } = req.body
  
    if (!serviceDate || !fk_vehicleNo || !fk_statusId) {
      return res.status(400).json({ message: 'All fields are required' })
    }
  
    const sql = `
      INSERT INTO service
      (serviceDate, fk_vehicleNo, fk_statusId)
      VALUES (?, ?, ?)
    `
  
    connection.query(
      sql,
      [serviceDate, fk_vehicleNo, fk_statusId],
      (err, result) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ message: err.sqlMessage})
        }
  
        res.status(201).json({
          message: 'Service saved successfully',
          serviceId: result.insertId   
        })
      }
    )
  }
  

/**
 * Update service by serviceId
 * PUT /:sid
 */
// PUT /:sid
const updateService = (req, res) => {
    const serviceId = req.params.sid
    const { serviceDate, fk_vehicleNo, fk_statusId } = req.body
  
    if (!serviceDate || !fk_vehicleNo || !fk_statusId) {
      return res.status(400).json({ message: 'All fields are required' })
    }
  
    const sql = `
      UPDATE service
      SET serviceDate = ?, fk_vehicleNo = ?, fk_statusId = ?
      WHERE serviceId = ?
    `
  
    connection.query(
      sql,
      [serviceDate, fk_vehicleNo, fk_statusId, serviceId],
      (err, result) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ message: 'Failed to update service' })
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Service not found' })
        }
  
        res.json({ message: 'Service updated successfully' })
      }
    )
  }
  

/**
 * Get all services
 * GET /
 * Includes vehicle & status details
 */
const getAllServices = (req, res) => {
  const sql = `
    SELECT
      s.serviceId,
      s.serviceDate,
      s.fk_vehicleNo,
      s.fk_statusId,
      st.statusName
    FROM service s
    JOIN status st ON s.fk_statusId = st.statusId
  `

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to fetch services' })
    }

    res.json(results)
  })
}

/**
 * Get service by serviceId
 * GET /get_by_serviceid/:sid
 */
const getServiceByServiceId = (req, res) => {
  const serviceId = req.params.sid

  const sql = `
    SELECT
      s.serviceId,
      s.serviceDate,
      s.fk_vehicleNo,
      s.fk_statusId,
      st.statusName
    FROM service s
    JOIN status st ON s.fk_statusId = st.statusId
    WHERE s.serviceId = ?
  `

  connection.query(sql, [serviceId], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to fetch service' })
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Service not found' })
    }

    res.json(results[0])
  })
}

/**
 * Get services by vehicle number
 * GET /get_by_vehicle_no/:vehicleno
 */
const getServiceByVehicleNo = (req, res) => {
  const vehicleNo = req.params.vehicleno

  const sql = `
    SELECT
      s.serviceId,
      s.serviceDate,
      s.fk_vehicleNo,
      s.fk_statusId,
      st.statusName
    FROM service s
    JOIN status st ON s.fk_statusId = st.statusId
    WHERE s.fk_vehicleNo = ?
  `

  connection.query(sql, [vehicleNo], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to fetch services' })
    }

    res.json(results)
  })
}

module.exports = {
  saveService,
  updateService,
  getAllServices,
  getServiceByServiceId,
  getServiceByVehicleNo
}
