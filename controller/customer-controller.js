const db = require('../db-connection');

/**
 * Save new customer
 * POST /
 */
const saveCustomer = async (req, res) => {
  const { nic, customerName, phone } = req.body;

  if (!nic || !customerName || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const sql =
      'INSERT INTO customer (nic, customerName, phone) VALUES (?, ?, ?)';

    await db.query(sql, [nic, customerName, phone]);

    res.status(201).json({ message: 'Customer saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save customer' });
  }
};

/**
 * Update customer
 * PUT /:nic
 */
const updateCustomer = async (req, res) => {
  const paramNic = req.params.nic;
  const { nic, customerName, phone } = req.body;

  if (!nic || !customerName || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const sql =
      'UPDATE customer SET nic = ?, customerName = ?, phone = ? WHERE nic = ?';

    const [result] = await db.query(sql, [
      nic,
      customerName,
      phone,
      paramNic
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update customer' });
  }
};

/**
 * Delete customer by NIC
 * DELETE /:nic
 */
const deleteCustomer = async (req, res) => {
  const nic = req.params.nic;

  try {
    const sql = 'DELETE FROM customer WHERE nic = ?';
    const [result] = await db.query(sql, [nic]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete customer' });
  }
};

/**
 * Get all customers
 * GET /
 */
const getAllCustomers = async (req, res) => {
  try {
    const sql = 'SELECT * FROM customer';
    const [results] = await db.query(sql);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
};

/**
 * Get customer by NIC
 * GET /get_by_nic/:nic
 */
const getCustomerByNIC = async (req, res) => {
  const nic = req.params.nic;

  try {
    const sql = 'SELECT * FROM customer WHERE nic = ?';
    const [results] = await db.query(sql, [nic]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch customer' });
  }
};

/**
 * Get customer by phone
 * GET /get_by_phone/:phone
 */
const getCustomerByPhone = async (req, res) => {
  const phone = req.params.phone;

  try {
    const sql = 'SELECT * FROM customer WHERE phone = ?';
    const [results] = await db.query(sql, [phone]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch customer' });
  }
};

module.exports = {
  saveCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerByNIC,
  getCustomerByPhone
};
