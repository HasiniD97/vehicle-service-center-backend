const db = require('../db-connection');

/**
 * Get all status
 * GET /
 */
const getAllStatus = async (req, res) => {
  try {
    const sql = 'SELECT * FROM status';
    const [rows] = await db.query(sql);

    res.json(rows);
  } catch (err) {
    console.error('Error fetching status:', err);
    res.status(500).json({ message: 'Failed to fetch status' });
  }
};

module.exports = {
  getAllStatus
};
