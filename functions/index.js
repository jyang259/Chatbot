'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');


// a. the action name from the ask_name Dialogflow intent
const NAME_ACTION = 'ask_name';
// b. the parameters that are parsed from the ask_name intent
const GIVENNAME_ARGUMENT = 'givenname';
const LASTNAME_ARGUMENT = 'lastname';


exports.askName = functions.https.onRequest((request, response) => {
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
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, getName);


app.handleRequest(actionMap);
});