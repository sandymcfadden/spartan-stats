import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import "firebase-functions";
admin.initializeApp();

const db = admin.firestore();

exports.firstUser = functions.firestore
    .document("users/{userId}")
    .onCreate(async (doc, ) => {
      const col = await db.collection("users").get();
      console.log("Starting first user function");
      if (col.size === 1) {
        console.log("This is the first user");
        const newUser = doc.data();
        admin.auth()
            .setCustomUserClaims(newUser.uid, {role: "admin"})
            .then(() => {
              console.log("done", doc);
              return {
                message: "done",
                data: doc,
              };
            })
            .catch((err) => {
              console.log("something went wrong", err);
              return err;
            });
      }
      console.log("Ending first user function");
    });

// exports.manageUsers = functions.firestore
//     .document("users/{userId}")
//     .onUpdate((change, context) => {
//       // implement in the future
//     });
