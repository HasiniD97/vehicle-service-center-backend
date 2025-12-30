const db = require('../db-connection');

/**
 * Save new vehicle
 * POST /
 */
const saveVehicle = async (req, res) => {
  const { vehicleNo, vehicleBrand, vehicleModel, fk_nic, fk_vehicleTypeId } = req.body;

  if (!vehicleNo || !vehicleBrand || !vehicleModel || !fk_nic || !fk_vehicleTypeId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const sql = `
      INSERT INTO vehicle
      (vehicleNo, vehicleBrand, vehicleModel, fk_nic, fk_vehicleTypeId)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.query(sql, [vehicleNo, vehicleBrand, vehicleModel, fk_nic, fk_vehicleTypeId]);
    res.status(201).json({ message: 'Vehicle saved successfully' });
  } catch (err) {
    console.error('Error saving vehicle:', err);
    res.status(500).json({ message: 'Failed to save vehicle' });
  }
};

/**
 * Update vehicle by vehicleNo
 * PUT /:vehicleno
 */
const updateVehicle = async (req, res) => {
  const paramVehicleNo = req.params.vehicleno;
  const { vehicleNo, vehicleBrand, vehicleModel, fk_nic, fk_vehicleTypeId } = req.body;

  if (!vehicleNo || !vehicleBrand || !vehicleModel || !fk_nic || !fk_vehicleTypeId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const sql = `
      UPDATE vehicle
      SET vehicleNo = ?, vehicleBrand = ?, vehicleModel = ?, fk_nic = ?, fk_vehicleTypeId = ?
      WHERE vehicleNo = ?
    `;
    const [result] = await db.query(sql, [vehicleNo, vehicleBrand, vehicleModel, fk_nic, fk_vehicleTypeId, paramVehicleNo]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json({ message: 'Vehicle updated successfully' });
  } catch (err) {
    console.error('Error updating vehicle:', err);
    res.status(500).json({ message: 'Failed to update vehicle' });
  }
};

/**
 * Delete vehicle by vehicleNo
 * DELETE /:vehicleno
 */
const deleteVehicle = async (req, res) => {
  const vehicleNo = req.params.vehicleno;

  try {
    const sql = 'DELETE FROM vehicle WHERE vehicleNo = ?';
    const [result] = await db.query(sql, [vehicleNo]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json({ message: 'Vehicle deleted successfully' });
  } catch (err) {
    console.error('Error deleting vehicle:', err);
    res.status(500).json({ message: 'Failed to delete vehicle' });
  }
};

/**
 * Get all vehicles (includes customer & vehicle type details)
 * GET /
 */
const getAllVehicles = async (req, res) => {
  try {
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
    `;
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Error fetching vehicles:', err);
    res.status(500).json({ message: 'Failed to fetch vehicles' });
  }
};

/**
 * Get vehicle by vehicleNo
 * GET /get_by_vehicleno/:vehicleno
 */
const getVehicleByVehicleNo = async (req, res) => {
  const vehicleNo = req.params.vehicleno;

  try {
    const sql = 'SELECT * FROM vehicle WHERE vehicleNo = ?';
    const [results] = await db.query(sql, [vehicleNo]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json(results[0]);
  } catch (err) {
    console.error('Error fetching vehicle:', err);
    res.status(500).json({ message: 'Failed to fetch vehicle' });
  }
};

/**
 * Get vehicles by customer NIC
 * GET /get_by_nic/:nic
 */
const getVehicleByNic = async (req, res) => {
  const nic = req.params.nic;

  try {
    const sql = 'SELECT * FROM vehicle WHERE fk_nic = ?';
    const [results] = await db.query(sql, [nic]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching vehicles by NIC:', err);
    res.status(500).json({ message: 'Failed to fetch vehicles' });
  }
};

module.exports = {
  saveVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleByVehicleNo,
  getVehicleByNic
};
