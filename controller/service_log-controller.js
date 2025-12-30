const db = require('../db-connection');

/**
 * Save new service log
 * POST /
 * Returns all logs for the given serviceId
 */
const saveServiceLog = async (req, res) => {
  const { description, fk_serviceId } = req.body;

  if (!description || !fk_serviceId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Insert service log
    const insertSql = `
      INSERT INTO service_log (description, fk_serviceId)
      VALUES (?, ?)
    `;

    await db.query(insertSql, [description, fk_serviceId]);

    // Fetch all logs for the service
    const selectSql = `
      SELECT
        serviceLogId,
        description,
        fk_serviceId
      FROM service_log
      WHERE fk_serviceId = ?
      ORDER BY serviceLogId ASC
    `;

    const [results] = await db.query(selectSql, [fk_serviceId]);

    res.status(201).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save service log' });
  }
};

/**
 * Get service logs by serviceId
 * GET /get_by_service_id/:sid
 */
const getServiceLogByServiceID = async (req, res) => {
  const serviceId = req.params.sid;

  try {
    const sql = `
      SELECT
        serviceLogId,
        description,
        fk_serviceId
      FROM service_log
      WHERE fk_serviceId = ?
      ORDER BY serviceLogId ASC
    `;

    const [results] = await db.query(sql, [serviceId]);

    res.json(results); // always array
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch service logs' });
  }
};

module.exports = {
  saveServiceLog,
  getServiceLogByServiceID
};
