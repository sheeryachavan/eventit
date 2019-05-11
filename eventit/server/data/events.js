const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;
const uuid = require("node-uuid");
// const users = require("./users");

exportedMethods = {

//get all events method

    async getAllEvents(){
       const eventsCollection = await events();
       const allEvents = await eventsCollection.find({}).toArray();
       return allEvents;
    },

// get event by id method

    async getEventById(Id){
       const eventsCollection = await events();
       const event1 = await eventsCollection.findOne({_id:Id});
       if(!event1){ throw `No Event found of id :${Id}`}
       return event1;
    },

//create new event method

    async createEvent(title,description,location,date,time,price,C0M){
      const eventsCollection = await events();
      console.log("inside create events method..."+title)
      // const userCollection = await users();
      // const userThatPosted = await userCollection.findOne({_id: user_id});

      for (let i = 0; i < C0M.length; i++)
         {
            const comm ={
                  _id: uuid.v4(),
                  name: C0M[i].name,
                  comment: C0M[i].comment
                        };
            C0M[i] = comm ;
         }

      const newEvent = {
        title: title,
        description: description,
        location: location,
        date: date,
        time: time,
        price: price,
        // user:{
        //   id:user_id,
        //   name:`${userThatPosted.firstName} ${userThatPosted.lastName}`
        // },
        comments: C0M,
        _id: uuid.v4()
      }

      console.log(newEvent);

      const newInsertInformation = await eventsCollection.insertOne(newEvent);
      const newE = await this.getEventById(newEvent._id);
         return newE;
      },

//update method, where can not update user name and comments

    async updateEvent(Id, updatedEvent) {
      const eventsCollection = await events();
      const updatedE= {};

       if ((!updatedEvent.title) || typeof updatedEvent.title !== "string")
        { throw "Invalid input in title.";}
       if ((!updatedEvent.description) || typeof updatedEvent.description !== "string")
        { throw "Invalid input in describtion.";}
       if ((!updatedEvent.location) || typeof updatedEvent.location !== 'string')
        { throw "Invalid input in location.";}
       if ((!updatedEvent.date) || typeof updatedEvent.date !== 'string')
         { throw "Invalid input in location.";}
       if ((!updatedEvent.time) || typeof updatedEvent.time !== 'string')
          { throw "Invalid input in time.";}
      if ((!updatedEvent.price) || typeof updatedEvent.price !== 'string')
         { throw "Invalid input in price.";}

        updatedE.title = updatedEvent.title;
        updatedE.description = updatedEvent.description;
        updatedE.location = updatedEvent.location;
        updatedE.date = updatedEvent.date;
        updatedE.time = updatedEvent.time;
        updatedE.price = updatedEvent.price;

       const updInfo = await eventsCollection.updateOne({_id: Id}, { $set: updatedE});
      if (updInfo.updatedtedCount === 0)
      { throw `Updation Failed.Could not update event ${Id}`;}
      return await this.getEventById(Id);
     },

// patch method

     async patchEvent(Id, patchedEvent) {

      const eventsCollection = await events();
      const patchedE = {};

       if (patchedEvent.title) {
          if (typeof patchedEvent.title !== "string")
          { throw "title should be a string";}
          patchedE.title = patchedEvent.title;
          }
       if (patchedEvent.description) {
          if (typeof patchedEvent.description !== "string")
            { throw "description should be a string";}
            patchedE.description = patchedEvent.description;
            }
       if (patchedEvent.location) {
          if (typeof patchedEvent.location !== "string")
               { throw "estimated hours should be a string";}
               patchedE.location = patchedEvent.location;
               }
       if (patchedEvent.date) {
          if (typeof patchedEvent.date !== "string")
               { throw "estimated hours should be a string";}
               patchedE.date = patchedEvent.date;
               }
       if (patchedEvent.time) {
          if (typeof patchedEvent.time !== "string")
               { throw "estimated hours should be a string";}
               patchedE.time = patchedEvent.time;
               }
       if (patchedEvent.price) {
          if (typeof patchedEvent.price !== "string")
               { throw "estimated hours should be a string";}
               patchedE.price = patchedEvent.price;
               }

       const patchedInfo = await eventsCollection.updateOne({_id: Id}, { $set: patchedE});
      if (patchedInfo.updatedtedCount === 0)
      { throw `Updation Failed.Could not update event ${Id}`;}

      return await this.getEventById(Id);
    },

//delete methods

      async deleteEvent(eventId)
      {
      const eventsCollection = await events();
      // const event1 = await this.getEventById(eventId);

      const updInfo = await eventsCollection.removeOne({ _id: eventId });
      if (updInfo.updatedtedCount === 0)
      { throw `deletion Failed.Could not delete event ${eventId}`;}
      return await this.getAllEvents();
    },

//----------COMMENTS methods-----------

//add new comment
      async createCom(eventId,Name,com1){
      const eventsCollection = await events();

      const newCom ={
       _id : uuid.v4(),
       name : Name,
       comment : com1
       }

      const event1 = await this.getEventById(eventId);
      event1.comments.push(newCom);

      const updInfo = await eventsCollection.updateOne({_id: eventId}, { $set: event1});
      if (updInfo.updatedtedCount === 0)
      { throw `addition Failed.Could not add comment`;}
      } ,

// delete comment

      async deleteCom(eventId,comId)
      {
      const eventsCollection = await events();
      const event1 = await this.getEventById(eventId);

      var removeIndex = event1.comments.map(function(item) { return item._id; }).indexOf(comId);
      event1.comments.splice(removeIndex, 1);

      const updInfo = await eventsCollection.updateOne({_id: eventId}, { $set: event1});
      if (updInfo.updatedtedCount === 0)
      { throw `deletion Failed.Could not delete comment ${comId}`;}
      }

  }

module.exports = exportedMethods;
