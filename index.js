const express = require('express');
const cors = require("cors");
const app = express()
const port = 3000

const customerRoute = require ('./routes/customer-route')
const vehicleRoute = require ('./routes/vehicle-route')
const serviceRoute = require ('./routes/service-route')
const service_logRoute = require ('./routes/service_log-route') 
const vehicle_typeRoute = require ('./routes/vehicle_type-route')
const statusRoute = require ('./routes/status-route')


// parse application/x-www-form-urlencoded
app.use(express.urlencoded())

// parse application/json
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);


app.use('/api/v1/customer', customerRoute)
app.use('/api/v1/vehicle', vehicleRoute)
app.use('/api/v1/service', serviceRoute)
app.use('/api/v1/service_log', service_logRoute)
app.use('/api/v1/vehicle_type', vehicle_typeRoute)
app.use('/api/v1/status', statusRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
