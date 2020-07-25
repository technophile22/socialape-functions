const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
admin.initializeApp();


const firebaseConfig = {
   apiKey: "AIzaSyD_rMYig9xULSvkFZSuXNPv1xu2vW1ovzQ",
   authDomain: "socialape-a639f.firebaseapp.com",
   databaseURL: "https://socialape-a639f.firebaseio.com",
   projectId: "socialape-a639f",
   storageBucket: "socialape-a639f.appspot.com",
   messagingSenderId: "267717782685",
   appId: "1:267717782685:web:72ead4b3f186b925317874",
   measurementId: "G-RBDJ9KGSQB"
 };




const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

//using express because express takes care of the get and post error
app.get('/screams', (req, res) => {
   db
   .collection('screams')
   .orderBy('createdAt', 'desc')
   .get()
   .then(data => {
         let screams = [];
         data.forEach(doc => {
            screams.push({
               screamId: doc.id,
               body: doc.data().body,
               userHandle: doc.data().userHandle,
               createdAt: doc.data().createdAt
            });
         });
         return res.json(screams);
      })
      .catch(err => console.error(err));
})

app.post('/scream', (req, res) => {
   
   const newScream = {
      body: req.body.body,
      userHandle: req.body.userHandle,
      createdAt: new Date().toISOString()
   };

   db
      .collection('screams')
      .add(newScream)
      .then(doc => {
         res.json({message: `document ${doc.id} created successfully`});
      })
      .catch(err => {
         res.status(500).json({error: 'something went wrong'});
         console.error(err);
      });
});




//https://basrurl.com/api/

//sign up route
app.post('/signup', (req, res) => {
   const newUser = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      handle: req.body.handle,
   };


   // TODO: validate data
let token, userId;
   db
      .doc(`/users/${newUser.handle}`).get()
         .then(doc => {
            if(doc.exists) {
               return res.status(400).json({handle : 'This handle is already taken'});
            }
            else {
               return firebase
               .auth()
               .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
         })
         .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
         })
         .then((idToken) => {
            token = idToken;
            const userCredentials = {
               handle: newUser.handle,
               email: newUser.email,
               createdAt: new Date().toISOString(),
               userId
            };
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);

         })
         .then( () => {
            return res.status(201).json({token});
         })
         .catch(err => {
            console.error(err);
            if(err.code === 'auth/email-already-in-use') {
               return res.status(400).json({email: 'Email is already in use'});

            }
            else{
               return res.status(500).json({error: err.code});
            }
            
         })
});
/*
   firebase
   .auth()
   .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(data => {
         return res.status(201).json({message: `user ${data.user.uid} signed up successfully`});
      })
      .catch(err => {
         console.error(err);
         return res.status(500).json({error: err.code});
      });
})
*/
exports.api = functions.https.onRequest(app); 
