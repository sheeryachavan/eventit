# eventit
 
 User Collection structure in Mongo:
 {
 _id: automatically created by mongo
 user_id: created by firebase, I sugguest to use this id to connect with events
 user_name: when creating an account, user input his name
 user_email: when creating an account, user input his email as login account
 events_owned: it is an empty array, when creating an account
 events_joined: it is an empty array, when creating an account
 }
 
 User module apis:
 
 method: post,
 url: "http://localhost:3001/eventit/user/addUser"
 
 body:{
  "user_name": name,
  "user_email":email,
  "user_id": uid
 }
