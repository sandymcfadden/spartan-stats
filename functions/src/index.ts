import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import "firebase-functions";
import * as sg from "@sendgrid/mail";

admin.initializeApp();

const SEND_EMAIL = Boolean(process.env.SEND_EMAIL);

if (SEND_EMAIL && process.env.SENDGRID_API_KEY) {
  sg.setApiKey(process.env.SENDGRID_API_KEY);
}

exports.processSignUp = functions.auth.user().onCreate(async (user) => {
  if (user.email === process.env.ADMIN_EMAIL) {
    const theUser = await admin.auth().getUserByEmail(user.email);
    admin.auth()
        .setCustomUserClaims(theUser.uid, {role: "admin"})
        .then(() => {
          console.log("Set admin role");
          return {
            message: "done",
          };
        })
        .catch((err) => {
          console.log("something went wrong", err);
          return err;
        });
  }
  if (!SEND_EMAIL) {
    return;
  }
  if (user.email) {
    const welcome = {
      to: user.email,
      from: process.env.SENDER_EMAIL,
      templateId: process.env.WELCOME_EMAIL_TEMPLATE_ID,
      dynamic_template_data: {
        subject: "Welcome to Spartan Stats!",
        name: user.displayName,
      },
    };

    sg.send(welcome);

    const notify = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.SENDER_EMAIL,
      templateId: process.env.NEW_USER_NOTIFICATION_TEMPLATE_ID,
      dynamic_template_data: {
        subject: "A new user has signed up to Spartan Stats!",
        name: user.displayName,
      },
    };

    sg.send(notify);
  }
});


exports.manageUsers = functions.firestore
    .document("users/{userId}")
    .onUpdate(async (change) => {
      const newUser = change.after.data();
      const previous = change.before.data();

      if (newUser.role !== previous.role) {
        const theUser = await admin.auth().getUserByEmail(previous.email);
        admin.auth()
            .setCustomUserClaims(theUser.uid, {role: newUser.role})
            .then(() => {
              console.log("Updated User Role");
              return {
                message: "done",
              };
            })
            .catch((err) => {
              console.log("something went wrong", err);
              return err;
            });
      }
    });
