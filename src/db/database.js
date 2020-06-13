const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'bavdg4xbrrbi3vimiuau-mysql.services.clever-cloud.com',
    user: 'u1omhj75jrgvyaw7',
    password: '1kQqwEHv59S8jZEDV7c8',
    database: 'bavdg4xbrrbi3vimiuau'
});


db.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Database connect');
    }
});


exports.db = db;  