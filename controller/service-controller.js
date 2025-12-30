const db = require('../db-connection');

/**
 * Save new service
 * POST /
 */
const saveService = async (req, res) => {
  const { serviceDate, fk_vehicleNo, fk_statusId } = req.body;

  if (!serviceDate || !fk_vehicleNo || !fk_statusId) {
    
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const sql = `
      INSERT INTO service
      (serviceDate, fk_vehicleNo, fk_statusId)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      serviceDate,
      fk_vehicleNo,
      fk_statusId
    ]);

    res.status(201).json({
      message: 'Service saved successfully',
      serviceId: result.insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.sqlMessage || 'Failed to save service' });
  }
};

/**
 * Update service by serviceId
 * PUT /:sid
 */
const updateService = async (req, res) => {
  const serviceId = req.params.sid;
  const { serviceDate, fk_vehicleNo, fk_statusId } = req.body;

  if (!serviceDate || !fk_vehicleNo || !fk_statusId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const sql = `
      UPDATE service
      SET serviceDate = ?, fk_vehicleNo = ?, fk_statusId = ?
      WHERE serviceId = ?
    `;

    const [result] = await db.query(sql, [
      serviceDate,
      fk_vehicleNo,
      fk_statusId,
      serviceId
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update service' });
  }
};

/**
 * Get all services
 * GET /
 * Includes vehicle & status details
 */
const getAllServices = async (req, res) => {
  try {
    const sql = `
      SELECT
        s.serviceId,
        s.serviceDate,
        s.fk_vehicleNo,
        s.fk_statusId,
        st.statusName
      FROM service s
      JOIN status st ON s.fk_statusId = st.statusId
    `;

    const [results] = await db.query(sql);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

/**
 * Get service by serviceId
 * GET /get_by_serviceid/:sid
 */
const getServiceByServiceId = async (req, res) => {
  const serviceId = req.params.sid;

  try {
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
    `;

    const [results] = await db.query(sql, [serviceId]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch service' });
  }
};

/**
 * Get services by vehicle number
 * GET /get_by_vehicle_no/:vehicleno
 */
const getServiceByVehicleNo = async (req, res) => {
  const vehicleNo = req.params.vehicleno;

  try {
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
    `;

    const [results] = await db.query(sql, [vehicleNo]);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

module.exports = {
  saveService,
  updateService,
  getAllServices,
  getServiceByServiceId,
  getServiceByVehicleNo
};
