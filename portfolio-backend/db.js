const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'portfolio'
});

db.connect((err) => {
    if (err) {
        console.error('❌ MySQL connection failed:', err.message);
        process.exit(1);
    }
    console.log('✅ Connected to MySQL Database!');
});

module.exports = db;