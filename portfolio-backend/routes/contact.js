const express = require('express');
const router = express.Router();
const db = require('../db');
const { validateContact } = require('../middleware/validate');

router.post('/', validateContact, (req, res) => {
    const { Name, Email, Mobile, Subject, Message } = req.body;
    console.log('Saving to DB:', { Name, Email, Mobile, Subject, Message });
    db.query(
        'INSERT INTO contacts (name, email, mobile, subject, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [Name, Email, Mobile || null, Subject, Message],
        (err, result) => {
            if (err) {
                console.error('DB Error:', err.message);
                return res.status(500).json({ success: false, message: 'DB error: ' + err.message });
            }
            console.log('Saved! Insert ID:', result.insertId);
            res.status(201).json({ success: true, message: 'Message received!' });
        }
    );
});
module.exports = router;