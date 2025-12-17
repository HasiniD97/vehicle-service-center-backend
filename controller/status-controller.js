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
    console.log('MySQL connected')
})



const getAllStatus = (req, res) => {
    const sql = 'SELECT * FROM status'

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ message: 'Failed to fetch status' })
        }
        res.json(results)
    })
}

module.exports = {
  getAllStatus
  }
  