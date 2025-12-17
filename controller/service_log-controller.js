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
  console.log('MySQL connected (service_log)')
})

/**
 * Save new service log
 * POST /
 * Returns all logs for the given serviceId
 */
const saveServiceLog = (req, res) => {
  const { description, fk_serviceId } = req.body

  if (!description || !fk_serviceId) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const insertSql = `
    INSERT INTO service_log
    (description, fk_serviceId)
    VALUES (?, ?)
  `

  connection.query(
    insertSql,
    [description, fk_serviceId],
    (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: 'Failed to save service log' })
      }

      // After insert, return all logs for this serviceId
      const selectSql = `
        SELECT
          serviceLogId,
          description,
          fk_serviceId
        FROM service_log
        WHERE fk_serviceId = ?
        ORDER BY serviceLogId ASC
      `

      connection.query(selectSql, [fk_serviceId], (err, results) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ message: 'Failed to fetch service logs' })
        }

        res.status(201).json(results)
      })
    }
  )
}

/**
 * Get service logs by serviceId
 * GET /get_by_service_id/:sid
 * Returns array of logs
 */
const getServiceLogByServiceID = (req, res) => {
  const serviceId = req.params.sid

  const sql = `
    SELECT
      serviceLogId,
      description,
      fk_serviceId
    FROM service_log
    WHERE fk_serviceId = ?
    ORDER BY serviceLogId ASC
  `

  connection.query(sql, [serviceId], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to fetch service logs' })
    }

    res.json(results) // always array
  })
}

module.exports = {
  saveServiceLog,
  getServiceLogByServiceID
}
