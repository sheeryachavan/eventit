# eventit
 
 User Collection structure in Mongo:
 {<br /> 
   _id: automatically created by mongo<br /> 
   user_id:  created by firebase, I sugguest to use this id to connect with events<br /> 
   user_name:  when creating an account, user input his name<br /> 
   user_email:  when creating an account, user input his email as login account<br /> 
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
