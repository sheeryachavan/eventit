const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.usersFirebase;

router.post("/addUser", async(req, res) => {
	try{
        const upload = req.body;
        console.log(req.body);
        if(typeof(upload.user_name) !=="string"){
            res.json({error:"Username or password not provided!"})
            return
        }
        
		let result = await userData.addUser(upload.user_name, upload.user_email, upload.user_id, [], []);
        if(result)
            res.json(result);
        else
            res.json({error:"Server is busy, please wait!"})
        
    }
	catch(e){
		res.json({error:"Server is busy, please try latter!!"})
	}
});



router.get("/*", async(req, res) => {
  res.redirect("http://localhost:3001/eventit/");
});


module.exports = router;



