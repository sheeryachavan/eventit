const express = require("express");
const router = express.Router();
const data = require("../data");
var cors = require('cors');
const userData = data.usersFirebase;

router.post("/addUser", async(req, res) => {
	try{
        const upload = req.body;
        console.log(req.body);
        if(typeof(upload.user_name) !=="string"){
            res.status(200).json({error:"Username or password not provided!"})
            return
        }
		let result = await userData.addUser(upload.user_name, upload.user_email, upload.user_id, upload.name,upload.phone, [], []);
        if(result)
            res.status(200).json(result);
        else
            res.status(500).json({error:"Server is busy, please wait!"})
    }
	catch(e){
		res.status(500).json({error:"Server is busy, please try latter!!"})
	}
});

router.get("/profile/:id",cors(), async(req, res) => {
    try{
        const result = await userData.getUserById(req.params.id);
        if(result)
            res.status(200).json(result);
        else
            res.status(500).json({error:"Server is busy, please wait!"})
    }
    catch(e){
				res.status(404).json({ message: "profile not found with this Id!" });
    }
});

router.get("/*", async(req, res) => {
  res.redirect("http://localhost:3001/eventit/");
});
module.exports = router;
