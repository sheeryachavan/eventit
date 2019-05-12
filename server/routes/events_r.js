const express = require("express");
const router = express.Router();
const data = require("../data");
var cors = require('cors');
const eventData = data.events;
const userData = data.usersFirebase;

router.post("/addevent",cors(),async(req, res) => {
	try{
    const upload = req.body;   
    let result = await eventData.addEvent(upload.event_name, upload.event_type, upload.event_description, upload.event_location, upload.event_begin, upload.event_end, upload.event_owner, upload.event_ownerContact, upload.event_ownerPhone, upload.event_ownerContact,[],upload.event_count,upload.event_keyword);
    
    if(!result)
      res.json({error:"Server is busy, please wait!"})

    let result2 = await userData.ownEventById(upload.event_owner,result.event_id)
    res.json(result);
    }
	catch(e){
		res.json({error:"Server is busy, please try latter!!"})
	}
});

router.get("/getevent/:id", cors(), async(req,res) =>{
  try{
    const result = await eventData.getEventById(req.params.id);
    if(result)
        res.json(result);
    else
      res.json({error:"Server is busy, please wait!"})
  }
  catch(e){
    res.json({error:"Server is busy, please try latter!!"})
}
});
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
router.get("/getAllEvents/:address", cors(), async(req,res)=>{
  try{
    const regex = new RegExp(escapeRegex(req.params.address), 'gi');
    var results = await eventData.getEventsByLocation(regex, req.params.address);
    res.json(results);
  }
  catch(e){
    res.json({error:"Server is busy, please try latter!!"})
  }
});
router.get("/getAllEvents", cors(), async(req,res)=>{
  try{
    const results = await eventData.getAllEvents();
    res.json(results);
  }
  catch(e){
    res.json({error:"Server is busy, please try latter!!"})
  }
});

router.put("/updateEvent/:id",cors(),async(req,res)=>{
  try{
    const upload = req.body; 
    
    const oldOne = await eventData.getEventById(req.params.id);
    const updated = {};
   
    updated.event_name = upload.event_name;
    updated.event_title = upload.event_title;
    updated.event_description = upload.event_description;
    updated.event_type = upload.event_type;
    updated.event_begin = upload.event_begin;
    updated.event_end = upload.event_end;
    updated.event_count = upload.event_count;
    updated.event_owner = upload.event_owner;
    updated.event_ownerName = upload.event_ownerName;
    updated.event_ownerPhone = upload.event_ownerPhone;
    updated.event_ownerContact = upload.event_ownerContact;
    updated.event_joiners = oldOne.event_joiners;
    updated.event_keyword = upload.event_keyword;
    updated.event_count = upload.event_count;
    updated.event_location = upload.event_location;

    // let temp =[];
    // for(let i = 0; i < oldOne.event_keyword.length; i++){
    //   temp[i] = oldOne.event_keyword[]
    // }
    const updatedResult = await eventData.updateEventById(req.params.id, updated);
		res.json(updatedResult);
  }
  catch(e){
    res.json({error:"Server is busy, please try latter!!"})
  }
});



router.get("/*", async(req, res) => {
  res.redirect("http://localhost:3001/eventit/");
});


module.exports = router;