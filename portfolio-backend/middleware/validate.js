function validateContact(req, res, next) {
    const { Name, Email, Subject, Message } = req.body;
    if (!Name || Name.trim().length < 2) return res.status(400).json({ success: false, message: 'Enter a valid name.' });
    if (!Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) return res.status(400).json({ success: false, message: 'Enter a valid email.' });
    if (!Subject || Subject.trim().length < 3) return res.status(400).json({ success: false, message: 'Subject too short.' });
    if (!Message || Message.trim().length < 10) return res.status(400).json({ success: false, message: 'Message too short.' });
    next();
}
module.exports = { validateContact };