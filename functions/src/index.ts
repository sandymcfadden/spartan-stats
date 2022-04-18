import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import "firebase-functions";
import * as sg from "@sendgrid/mail";

admin.initializeApp();

const db = admin.firestore();

const SEND_EMAIL = Boolean(process.env.SEND_EMAIL);

if (SEND_EMAIL && process.env.SENDGRID_API_KEY) {
  sg.setApiKey(process.env.SENDGRID_API_KEY);
}

exports.firstUser = functions.firestore
    .document("users/{userId}")
    .onCreate(async (doc, ) => {
      const col = await db.collection("users").get();
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
    });

exports.processSignUp = functions.auth.user().onCreate(async (user) => {
  if (!SEND_EMAIL) {
    return;
  }
  if (user.email) {
    const welcome = {
      to: user.email,
      from: "me@sandymcfadden.com",
      templateId: process.env.WELCOME_EMAIL_TEMPLATE_ID,
      dynamic_template_data: {
        subject: "Welcome to Spartan Stats!",
        name: user.displayName,
      },
    };

    sg.send(welcome);

    const notify = {
      to: process.env.ADMIN_EMAIL,
      from: "me@sandymcfadden.com",
      templateId: process.env.NEW_USER_NOTIFICATION_TEMPLATE_ID,
      dynamic_template_data: {
        subject: "A new user has signed up to Spartan Stats!",
        name: user.displayName,
      },
    };

    sg.send(notify);
  }
});


// exports.manageUsers = functions.firestore
//     .document("users/{userId}")
//     .onUpdate((change, context) => {
//       // implement in the future
//     });
