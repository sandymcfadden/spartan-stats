# Spartan Stats

## Description
Spartan Stats is a PWA (Progressive Web App) which which allows you to keep real time stats of a single basketball team. As you are entering stats authorized visitors will be to see the current score of the game, up to date stats, and play by play, as you are entering.

This project is still in the early stages, but the basics are functional.

The way information is organized starts with Seasons. A season contains a Team, Players, and Games. The Games contain scores, player stats, and play by play information.

### User Roles
Spartan Stats currently works with three types of user roles. 

#### Admin
The Admin role which is able to create new Seasons which includes team and player information. Admins can also manage other users of the app to approve them as they sign up and assign them their role. Any user isn't able to login until they have been assigned a role.

#### Stats
The Stats role has the ability to enter stats for a game.

#### Viewer
The Viewer role allows visitors to see the game information and stats updating live as they are added.

## Demo Site
There is a limited functionality demo site set up so you can see how it looks and works.
- Site: [https://demo.spartanstats.com/](https://demo.spartanstats.com/)
- Email: `stats@spartanstats.com`
- Password: `X9s2!dvxrpiVNslU`

## Requirements
Spartan Stats is built using [Google Firebase](https://firebase.google.com/) and uses a number of the features there. It requires an account there and a project with their Blaze plan. 

In order to build and deploy it also requires some work in the terminal / command line. It requires that you have [npm installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Sending emails is optional but it is recommended. This is handled by using [Sendgrid](https://sendgrid.com) and requires an account there.

## Setup
The set up is fairly complicated at the moment 
It involves editing a couple of config files and running some commands from your terminal.

### Firebase
- Create new Firebase project
- Add Authentication 
  - Add Email and Password as a Sign-in provider and enable it
- Add Firestore Database
  - Create a new database
  - Can start in test mode
- Add Functions 
  - Requires an [upgraded plan](https://firebase.google.com/pricing) account with billing details added
- Install firebase tools with the command  `npm install -g firebase-tools`
- Run `firebase login` and log in to your account
- Run `firebase projects:list` to list your projects. Take note of your Project ID
- Run `firebase use <YOUR_PROJECT_ID>` replacing `<YOUR_PROJECT_ID>` with your actual Project ID
- Rename `/example.firebaserc` to be `/.firebaserc`
- Edit `.firebaserc` and replace `your-project-id` with your Project ID
- Go to Firebase Project Overview and add a new Web App
- On the step staying Add Firebase SDK you'll receive your firebaseConfig information
- Rename the file `/env/example.env` to be `/env/.env`
- Edit that file and add in firebaseConfig information to the variables here. Add without the quotes.
- Ensure `yarn` is installed with `npm install --global yarn`
- Run the command `yarn` to install all the dependencies
- Run the command `cd functions` to switch to the functions folder
- Run the command `npm install` to install the functions dependencies
- Run the command `cd ..` to go back to the main directory
- Rename the file `/functions/.env.example` to be `/functions/.env`
- Change the `ADMIN_EMAIL` to be your email instead of `<YOUR EMAIL>`
- Run the command `firebase deploy --only firestore:rules`
- Run the command `firebase deploy --only firestore:indexes`
- Run the command `firebase deploy --only functions`
- Run the command `yarn deploy`
- This will give you the URL for your app
- Visit the URL in a browser
- Choose to sign up in the bottom right
- Sign up using the `ADMIN_EMAIL` you set in `/functions/.env` earlier. This will cause your account to be created as an admin in the app.
- The app is now all ready to be used

### Configure Email sending
There are three types of emails which are sent from the app. The emails are sent through Sendgrid. Emails are sent to the main email when someone signs up to the app letting you know. We send them an email when they first sign up acknowledging, then send another email when their account has been approved.

If you don't want to send emails you won't have to follow this step, but it is recommended.
- Set up an account at [Sendgrid](https://sendgrid.com)
- Set up a sender profile with a verified sender address
- Create three email templates for the following and keep note of their template Ids:
  - Welcome email
  - New user notifications
  - Account approved
- Get your Sendgrid API key from Settings and API Keys
- Edit `/functions/.env`
- Change `SEND_EMAIL=false` to be `SEND_EMAIL=true`
- Replace the rest of the variables with template Ids, and API key from Sendgrid
- Run the command `cd functions` to switch to the functions folder
- Run the command `firebase deploy --only functions`

## Running locally
You can run the app locally by running the command `yarn dev`. This will allow you to view the app connected to the live database at http://localhost:5000

#### Credit
Spartan Icon made by [Freepik](https://www.freepik.com "Freepik") from [www.flaticon.com](https://www.flaticon.com/ "Flaticon")
