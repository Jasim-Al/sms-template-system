Routes:

User Routes:

/************/
//create user
/***********/

POST : http://localhost:5000/api/users/

body : type JSON : {
    "email" : "required,unique",
    "password" : "required,min-len:6"
}

eg: {
    "email" : "admin@gmail.com",
    "password" : "password"
}

response: {
  "user": {
    "email": "admin@gmail.com",
    "apiKey": "23802a93-8e34-42be-9a89-b7d59c05ce17",
    "messages": [],
    "_id": "63273f51ce83a7b698511c72",
    "__v": 0,
    "id": "63273f51ce83a7b698511c72"
  },
  "message": "User created successfully",
  "status": "created"
}

! IMPORTAND API KEY IS IMPORTAND AND SHOULD BE PASSED AS A QUERY PARAMETER FOR EVERY MESSAGE RELATED ROUTES

! IMPORTAND when adding variables such as apiKey and other dynamic values for messages please also exclude the curly braces as shown in the examples below.

Message Routes:

/************************/
//create message template
/************************/

you can create as much as dynamic content as you want just wrap the variables between "$" charector.
The url to create a new message will come as a field in the response.

POST : http://localhost:5000/api/messages?key={apiKey}

body: type JSON : {
    "title" : "required",
    "message" : "required"
}

eg-url = http://localhost:5000/api/messages?key=23802a93-8e34-42be-9a89-b7d59c05ce17  

eg : {
  "title":"new message",
  "message":"Hi,$name$ you are $age$ years old, right?"
}

response : {
  "message": {
    "title": "new message",
    "message": "Hi,$name$ you are $age$ years old, right?",
    "creator": "63273f51ce83a7b698511c72",
    "_id": "632741b6ce83a7b698511c78",
    "__v": 0,
    "id": "632741b6ce83a7b698511c78"
  },
  "successMessage": "Message created successfully",
  "url": "http://localhost:5000/api/messages/create/632741b6ce83a7b698511c78?name={name}&age={age}&key=23802a93-8e34-42be-9a89-b7d59c05ce17",
  "status": "created"
}

! IMPORTAND as you can see the url to create a new message is also part of the response, all you need to do is to replace those value to the the content.Also the api key is also appended.

/**********************/
//view created template
/*********************/

GET : http://localhost:5000/api/messages/{messageID}?key={apiKey}

eg-url : http://localhost:5000/api/messages/632741b6ce83a7b698511c78?key=23802a93-8e34-42be-9a89-b7d59c05ce17

response: {
  "message": {
    "_id": "632741b6ce83a7b698511c78",
    "title": "new message",
    "message": "Hi,$name$ you are $age$ years old, right?",
    "creator": "63273f51ce83a7b698511c72",
    "__v": 0
  },
  "status": "success"
}

/******************************/
//create message using template
/*****************************/

GET : http://localhost:5000/api/messages/create/{id of the message}?{variables}={value}&key={apiKey}

eg-url : http://localhost:5000/api/messages/create/632741b6ce83a7b698511c78?name=Jasim&age=21&key=23802a93-8e34-42be-9a89-b7d59c05ce17

response : {
  "message": "Hi,Jasim you are 21 years old, right?",
  "status": "success"
}

! IMPORTAND please replace curly braces otherwise it will also be added in the response.

/****************/
//update message
/***************/

this also returns the new url to create the new message.

PATCH : http://localhost:5000/api/messages/{messageID}?key={apiKey}

body : type JSON : {
    message : {required}
}

eg-url : http://localhost:5000/api/messages/632741b6ce83a7b698511c78?key=23802a93-8e34-42be-9a89-b7d59c05ce17

eg : {
  "message" : "Hola $name$,how are you."
}

response : {
  "message": {
    "_id": "632741b6ce83a7b698511c78",
    "title": "new message",
    "message": "Hola $name$,how are you.",
    "creator": "63273f51ce83a7b698511c72",
    "__v": 0
  },
  "url": "http://localhost:5000/api/messages/create/632741b6ce83a7b698511c78?name={name}&key=23802a93-8e34-42be-9a89-b7d59c05ce17",
  "status": "success"
}

/*****************/
//Delete a message
/****************/

DELETE : http://localhost:5000/api/messages/{messageID}?key={apiKey}

eg-url : http://localhost:5000/api/messages/632741b6ce83a7b698511c78?key=23802a93-8e34-42be-9a89-b7d59c05ce17

response : {
  "message": "Deleted message.",
  "status": "success"
}