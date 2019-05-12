# eventit
 
 User Collection structure in Mongo:
 {<br /> 
   _id: automatically created by mongo<br /> 
   user_id:  created by firebase, I sugguest to use this id to connect with events<br /> 
   user_name:  when creating an account, user input his account which exactly equals his email account<br /> 
   user_email:  when creating an account, user input his email as login account<br /> 
   name: when creating an account, user input his name
   events_owned:  it is an empty array, when creating an account<br /> 
   events_joined:  it is an empty array, when creating an account<br /> 
 }
 
 
 User module apis:<br /> 
 method: post,<br /> 
 url: "http://localhost:3001/eventit/user/addUser"<br /> 
 body:{<br /> 
  "user_name": name,
  "user_email":email,
  "user_id": uid <br /> 
 }<br /> 
 
 
 
 Event module  apis: <br /> 
 method:post, <br /> 
 url: "http://localhost:3001/eventit/event/addEvent" <br /> 
 
 body: <br /> 
 { <br /> 
	"event_name": "sleep", <br /> 
 "event_type": "relaxing", <br /> 
 "event_location": "NewYork", <br /> 
	"event_owner": "9vwq8r2W06Yw8ITxBTfWHzxevAS2", <br /> 
	"event_ownerName":"Wang", <br /> 
	"event_ownerPhone" : "8601113399", <br /> 
	"event_ownerContact" : "wang@stevens.edu", <br /> 
	"event_begin": "2019/05/11", <br /> 
	"event_end": "2019/05/13", <br /> 
	"event_count": 50, <br /> 
	"event_keyword": ["a","b"], <br /> 
	"event_description":"123123123" <br /> 
}






