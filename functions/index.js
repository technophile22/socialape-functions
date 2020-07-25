const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/fbAuth');
const {getAllScreams, postOneScream } = require('./handlers/screams');
const {signup, login} = require('./handlers/users');


//scream routes

//gets all the screams
app.get('/screams', getAllScreams);
//Post one scream
app.post('/scream', FBAuth, postOneScream);

//users routes
app.post('/signup', signup);
app.post('/login', login);



exports.api = functions.https.onRequest(app); 
