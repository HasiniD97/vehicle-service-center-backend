const dbConnection = require('../db-connection');
const connection = dbConnection;

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
  