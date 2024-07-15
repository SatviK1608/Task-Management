const express =  require('express');
const router  = express.Router();
const {login ,signup ,logout} = require("../Controller/authcontr")


router.post('/login' , login)

router.get('/logout' ,logout )
 
router.post('/signup' ,signup )

module.exports = router;