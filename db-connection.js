let mysql = require('mysql2')

let db;

function getConnection() {

    if (!db) {

        db = mysql.createConnection({

            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'vehicle_service'

        });

    }


    // db.connect((err) => {
    //     if (err) {
    //       console.error('Database connection failed:', err)
    //       return
    //     }
    //     console.log('MySQL connected')
    //   })
      


    return db;

}

module.exports = getConnection();

