# Event-it

Event-it is an application that connects users to community-created events. Upon creating an account, a user may either create their own event or register and sign up for events owned by other users. <br/>

User registration, login, and security are provided by Firebase Authentication. 

Events are searchable through either Location keywords or Tagged keywords, depending on toggle.

Locations are populated in a dropdown box via the Google Geocode API.

##  Installation
(Active internet connection is must)
Two sets of packages must be installed, one for the Server backend, and one for the Frontend.
```
>cd frontend 
>npm install  
>cd .. 
>cd server 
>npm install  
```
## Build App

In terminal 1 run mongoDB
```
>mongod
```

Then, in the terminal in /server folder, run: </br>
```
>npm run seed 
>npm run build
```
When terminal displays 'INFO: Accepting connections at http://localhost:5000',
Event.it is ready for use.

Then navigate to http://localhost:5000 in your browser. This application is best viewed in Chrome.

On the homepage (http://localhost:5000) there is a Search bar and Create Event button centrally located.

## Log-in and Users

Note that clicking the Event button displays an error message: Login or Create Account is required. 

Both Login and Sign Up are in the upper right-hand corner. Sign Up properly detects if an email is already in use. 

Logging in takes the user back to the homepage, where the user will see three new buttons in the upper right-hand corner: My Profile, All Events, and Sign Out. 

The My Profile button takes users to their profile, which lists relevant identification information as well as a list of all Events owned by that user. 

## Events

A user can now create an event with the Create Event button. The Address field is populated by Google Geocode API. 

Events can be seen by scrolling down on the homepage or by clicking the All Events button in the upper right-hand corner while logged in. 

While viewing an Event that is not owned by the user, that user may Register for that event. If the event registrations are full, the register button is replaced by "Resgistratin full" label. If user registers for the event, the register button is replaced by "You are Registered!" label. If Brochure of the event is available, event brochure option is shown where you can view the brochure. Event owner also gets email notification when someone joins his event

While viewing an Event that is owned by the user, that user may Update the Event. The owner can see all users who have registered to attend their event and also receives an email whenever an attendee joins an event.Owner can upload a brochure for the event. 

## Searching

Events can be searched for based on either Location or by Keywords by toggling the switch in the upper left-hand corner. Locations utilize the Google Geocode API for matching. Event search is impemented using fuzzy search.


#Have Fun! and dont forget to check the AboutUs page.

# Technologies used
React JS, HTML, CSS: handle front end

NodeJS: Handle backend

Express: as a server

MongoDB: as database

Redux: fetch logged-in userid throughout the components of react

Firebase: for user authentication

Google maps api: for places suggestions in search

Amazon AWS s3 bucket: to store event brochures

imagemagick: to resize images


#Special Thanks to
W3 School
Stack overflow
Prof. Patrick Hill
Rozy Gupta
https://github.com/keithweaver/python-aws-s3
https://medium.com/@khelif96/uploading-files-from-a-react-app-to-aws-s3-the-right-way-541dd6be689

#==============================================================================

#Presenters
Conor Manning
Krutarth Trivedi
Michael Fang
Shreesh Chavan
Tianyi Wang


Technical
--------------------------------------------------------------------------------------------


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
	"event_date": "2019/05/11", <br /> 
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


## License
[MIT](https://choosealicense.com/licenses/mit/)
