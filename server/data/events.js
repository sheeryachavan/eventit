const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;
const uuid = require("uuid/v4");

const exportedMethods = {

	async addEvent(event_name,event_type,event_description,event_location,event_begin,event_end,event_owner,event_ownerName,event_ownerPhone,event_ownerContact,event_joiners,event_count,event_keyword){
		const eventCollection = await events();
		
		const newEvent = {
			event_id: uuid(),
			event_name: event_name,
			event_type: event_type,
			event_description: event_description,
            event_location: event_location,
			event_owner: event_owner,
			event_ownerName: event_ownerName,
			event_ownerPhone: event_ownerPhone,
			event_ownerContact: event_ownerContact,
            event_joiners: event_joiners,
            event_begin: event_begin,
			event_end: event_end,
			event_count: event_count,
            event_keyword: event_keyword
        };
        
		const newEventInfo = await eventCollection.insertOne(newEvent);
		if(newEventInfo === null) 
			throw "Something wrong!";
		return newEvent;
	},

	async getEventById(event_id){
		const eventCollection = await events();
		const event = await eventCollection.findOne({event_id: event_id});
		if(!event)
			throw "Event not found"
		return event;
	},

	async getAllEvents(){
		const eventCollection = await events();
		console.log(1)
		let eventList = await eventCollection.find({}).toArray();
		
		let result = [];
		for(let i = 0; i < eventList.length; i++){
			let temp = {"event_id":eventList[i].event_id, "event_name":eventList[i].event_name,"event_location":eventList[i].event_location,"event_joiners":eventList[i].event_joiners.count};
			result.push(temp);
		}
		return result;		
	},

	async updateEventById(event_id, event_info){
		const eventCollection = await events();
		const updateData = {};
		if(event_info.event_name){
			updateData.event_name = event_info.event_name;
		}
		if(event_info.event_type){
			updateData.event_type = event_info.event_type;
		}
		if(event_info.event_description){
			updateData.event_description = event_info.event_description;
		}
		if(event_info.event_location){
			updateData.event_location = event_info.event_location;
		}
		if(event_info.event_owner){
			updateData.event_owner = event_info.event_owner;
		}
		if(event_info.event_ownerName){
			updateData.event_ownerName = event_info.event_ownerName;
		}
		if(event_info.event_ownerPhone){
			updateData.event_ownerPhone = event_info.event_ownerPhone;
		}
		if(event_info.event_ownerContact){
			updateData.event_ownerContact = event_info.event_ownerContact;
		}
		if(event_info.event_begin){
			updateData.event_begin = event_info.event_begin;
		}
		if(event_info.event_end){
			updateData.event_end = event_info.event_end;
		}
		if(event_info.event_count){
			updateData.event_count = event_info.event_count;
		}
		if(event_info.event_keyword){
			updateData.event_keyword = event_info.event_keyword;
		}
		if(event_info.event_joiners){
			updateData.event_joiners = event_info.event_joiners;
		}
		const updateInfo = await eventCollection.updateOne({event_id : event_id},{$set : updateData});
		if(updateInfo === null) throw "Can not update this event!";
        return await this.getEventById(event_id);
	},
	
	async deleteEvent(event_id)
      {
      const eventCollection = await events();
      const updInfo = await eventCollection.removeOne({ event_id: event_id });
      if (updInfo.updatedtedCount === 0)
      { throw `deletion Failed.Could not delete event ${eventId}`;}
      return true;
    },
	async getEventsByLocation(tag, normaltag) {
        if (!tag) throw "You must provide a tag";
        return events().then(async eventCollection => {
            var l_arreventnamenormal = await eventCollection.find({
                event_name: normaltag
            }).toArray();
            var l_arreventtags = await eventCollection.find({
                event_location: tag
            }).toArray();
            var l_arrdata = Array.from(new Set(l_arreventtags.concat(l_arreventnamenormal)));
            l_arrdata = l_arrdata.filter((thing, index, self) =>
                index === self.findIndex((t) => (
                    t.event_id === thing.event_id
                ))
            );
            return l_arrdata;
        });
    }
}


module.exports = exportedMethods;









