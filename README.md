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
 
 --------------------------------------------------------------------------------------------
user profile: <br /> 
method: get <br /> 
url: "http://localhost:3001/eventit/user/profile/:user_id" <br /> 

 --------------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------
 
 Event module  apis: <br /> 
 Add event:<br /> 
 method:post, <br /> 
 url: "http://localhost:3001/eventit/event/addEvent" <br /> 
 
 body: <br /> 
 { <br /> 
	"event_name": "sleep", <br /> 
 "event_type": "relaxing", <br /> 
 "event_description":"123123123", <br /> 
 "event_location": "NewYork", <br /> 
	"event_owner": "9vwq8r2W06Yw8ITxBTfWHzxevAS2", <br /> 
	"event_ownerName":"Wang", <br /> 
	"event_ownerPhone" : "8601113399", <br /> 
	"event_ownerContact" : "wang@stevens.edu", <br /> 
	"event_date":
	"event_begin": "2019/05/11", <br /> 
	"event_end": "2019/05/13", <br /> 
	"event_count": 50, <br /> 
	"event_keyword": ["a","b"] <br /> 
	
} <br /> 

--------------------------------------------------------------------------------------------
get event: <br /> 
method: get <br /> 
url: "http://localhost:3001/eventit/event/getEvent/:event_id" <br /> 

--------------------------------------------------------------------------------------------
get all events: <br /> 
method: get <br /> 
url: "http://localhost:3001/eventit/event/getAllEvent" <br /> 

--------------------------------------------------------------------------------------------
edit event:<br /> 
method:put<br /> 
url: "http://localhost:3001/eventit/event/updateEvent/:event_id"<br /> 
body:<br /> 
{<br /> 
"event_name": "sleep222",<br /> 
   "event_type": "relaxing31",<br /> 
   "event_location": "NewYork123",<br /> 
	"event_ownerName":"Jax",<br /> 
	"event_ownerPhone" : "8601113399",<br /> 
	"event_ownerContact" : "Joe@stevens.edu",<br /> 
	"event_begin": "2019/05/11",<br /> 
	"event_end": "2019/05/13",<br /> 
	"event_count": 500,<br /> 
	"event_keyword": ["a","b","c","d"]<br /> 
}<br /> 

--------------------------------------------------------------------------------------------
join event:<br /> 
method:post<br /> 
url: url: "http://localhost:3001/eventit/event/joinEvent"<br /> 
body{<br /> 
	"event_id":"",<br /> 
	"user_id":""<br /> 
}<br /> 

--------------------------------------------------------------------------------------------
cancel join application for event:<br /> 
method:post<br /> 
url: url: "http://localhost:3001/eventit/event/cancelEvent"<br /> 
body{<br /> 
	"event_id":"",<br /> 
	"user_id":""<br /> 
}<br /> 











