
const { Router } = require("express");
const router = Router();
const path = require("path");

router.get("/monkey", (req, res)=>{
  console.log('fethc monkeys');
  res.sendFile(path.join(__dirname, '../public', "monkey.html"));
});

module.exports = router;