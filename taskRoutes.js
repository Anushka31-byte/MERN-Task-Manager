const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.json({ message: "Task route working perfectly!" });
});

module.exports = router;