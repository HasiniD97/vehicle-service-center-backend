const dbConnection = require('../db-connection');
const connection = dbConnection;

/**
 * Save new customer
 * POST /
 */
const saveCustomer = (req, res) => {
  const { nic, customerName, phone } = req.body

  if (!nic || !customerName || !phone) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const sql =
    'INSERT INTO customer (nic, customerName, phone) VALUES (?, ?, ?)'

    connection.query(sql, [nic, customerName, phone], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to save customer' })
    }
    res.status(201).json({ message: 'Customer saved successfully' })
  })
}

/**
 * Update customer
 * PUT /
 */
const updateCustomer = (req, res) => {
  const paramnic = req.params.nic
  const { nic, customerName, phone } = req.body

  if (!nic || !customerName || !phone) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const sql =
    'UPDATE customer SET nic = ?, customerName = ?, phone = ? WHERE nic = ?'

    connection.query(sql, [nic,customerName, phone, paramnic], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to update customer' })
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' })
    }

    res.json({ message: 'Customer updated successfully' })
  })
}

/**
 * Delete customer by NIC
 * DELETE /:nic
 */
const deleteCustomer = (req, res) => {
  const nic = req.params.nic

  const sql = 'DELETE FROM customer WHERE nic = ?'

  connection.query(sql, [nic], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to delete customer' })
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' })
    }

    res.json({ message: 'Customer deleted successfully' })
  })
}

/**
 * Get all customers
 * GET /
 */
const getAllCustomers = (req, res) => {
  const sql = 'SELECT * FROM customer'

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to fetch customers' })
    }
    res.json(results)
  })
}

/**
 * Get customer by NIC
 * GET /get_by_nic/:nic
 */
const getCustomerByNIC = (req, res) => {
  const nic = req.params.nic

  const sql = 'SELECT * FROM customer WHERE nic = ?'

  connection.query(sql, [nic], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to fetch customer' })
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Customer not found' })
    }

    res.json(results[0])
  })
}

/**
 * Get customer by phone
 * GET /get_by_phone/:phone
 */
const getCustomerByPhone = (req, res) => {
  const phone = req.params.phone

  const sql = 'SELECT * FROM customer WHERE phone = ?'

  connection.query(sql, [phone], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to fetch customer' })
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Customer not found' })
    }

    res.json(results)
  })
}

module.exports = {
  saveCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerByNIC,
  getCustomerByPhone
}
