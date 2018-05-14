'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');


// a. the action name from the ask_name Dialogflow intent
const NAME_ACTION = 'ask_name';
// b. the parameters that are parsed from the ask_name intent
const GIVENNAME_ARGUMENT = 'givenname';
const LASTNAME_ARGUMENT = 'lastname';

// a. the action name from the ask_birthdate Diaglogflow intent
const BIRTHDATE_ACTION = 'ask_birthdate';
// b. the parameters that are parsed from the ask_birthdate intent
const BIRTHDATE_ARGUMENT = 'birthdate';

//Start the action
//ask name
exports.askInfo = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));


// c. The function that gets the name
  function getName (app) {
    let lastname = app.getArgument(LASTNAME_ARGUMENT);
    let givenname = app.getArgument(GIVENNAME_ARGUMENT);
    app.tell('Great! Thanks ' +
      givenname + ' ' + lastname +
      '! Let\'s keep going!');
  }

// c. The function that gets the name
  function getBirthdate (app) {
    let birthdate = app.getArgument(BIRTHDATE_ARGUMENT);
    app.tell('Okay, your date of birth is saved as ' +
      birthdate);
  }

// // Return the last journal entry
//   function reflect (app) {
//     let grateful_1 = app.getArgument(GRATEFUL_1);
//     app.tell('Here is your previous entry: ' + grateful_1);
//   }

  // // Build an action map, which maps intent names to functions
  // let actionMap = new Map();
  // actionMap.set(QUESTION_1, reflect);


  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, getName);


app.handleRequest(actionMap);
});

// //ask birthdate
// exports.askBirthdate = functions.https.onRequest((request, response) => {
//   const app = new App({request, response});
//   console.log('Request headers: ' + JSON.stringify(request.headers));
//   console.log('Request body: ' + JSON.stringify(request.body));



//   // d. build an action map, which maps intent names to functions
//   let actionMap = new Map();
//   actionMap.set(BIRTHDATE_ACTION, getBirthdate);


// app.handleRequest(actionMap);
// });