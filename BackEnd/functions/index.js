// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.adddHistoryData = functions.database.ref('/{robot}/')
    .onUpdate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const robot = snapshot.after.val();
      console.log(JSON.stringify(snapshot, undefined, 2));
      return admin.firestore().collection('robotHistory').add({
        robotData: robot
      });
    });