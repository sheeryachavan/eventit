const express = require("express");
const router = express.Router();
const data = require("../data");
const eventsData = data.events;

//get all events

router.get("/", async (req, res) => {
    try {
      const eventsList = await eventsData.getAllEvents();
      res.json(eventsList);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  });

// get event with id

router.get("/:id", async (req, res) => {
  try {
    const event = await eventsData.getEventById(req.params.id);
    res.json(event);
  } catch (e) {
    res.status(404).json({ message: "not found!" });
  }
});

//add new event

router.post("/", async (req, res) => {
  try {
    const data1 = req.body;
    const {title,description,location,date,time,price,comments} = data1;
    let newEvent = await eventsData.createEvent(data1.title,
      data1.description,
      data1.location,
      data1.date,
      data1.time,
      data1.price,
      data1.comments
    );
    console.log(newEvent);
    res.json(newEvent);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//edit event

router.put("/:id", async (req, res) => {
    const updatedData = req.body;
    try {
      const updatedEvent = await eventsData.updateEvent(req.params.id, updatedData);
      res.json(updatedEvent);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  });

//update whole event

router.patch("/:id", async (req, res) => {
    const updatedData = req.body;
    console.log(updatedData);
    try {
        const patchedEvent = await eventsData.patchEvent(req.params.id, updatedData);
        console.log(patchedEvent);
        res.json(patchedEvent);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  });

// delete event

router.delete("/:eventId", async (req,res)=>{
   try{
       const AllEve = await eventsData.deleteEvent(req.params.eventId);
       res.json(AllEve);
   } catch(e) {
     res.status(404).json({ error: e });
   }
});

//add comment
router.post("/:id/comments", async (req,res)=>{

     const comData = req.body;
     // console.log(comData);
    try{
        const {name,comment} = comData;
        const newCom = await eventsData.createCom(req.params.id,name,comment);
        const updEvent = await eventsData.getEventById(req.params.id);
        res.json(updEvent);
    } catch(e) {
      res.status(404).json({ error: e });
    }
});

//delete comment

router.delete("/:eventId/:commentId", async (req,res)=>{
   try{
       const newCom = await eventsData.deleteCom(req.params.eventId,req.params.commentId);
       const updEvent = await eventsData.getEventById(req.params.eventId);
       res.json(updEvent);
   } catch(e) {
     res.status(404).json({ error: e });
   }
});


module.exports = router;
