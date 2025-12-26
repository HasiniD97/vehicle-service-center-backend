const dbConnection = require('../db-connection');
const connection = dbConnection;

const getAllVehicleTypes = (req, res) => {
    const sql = 'SELECT * FROM vehicle_type'

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ message: 'Failed to fetch vehicle types' })
        }
        res.json(results)
    })
}


module.exports = {
    getAllVehicleTypes
    }