'use strict';
var restify = require('restify');
var builder = require('botbuilder');
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// // Listen for messages from users 
// server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
// var bot = new builder.UniversalBot(connector, function (session) {
//     var customMessage = new builder.Message(session)
//         .text("This is a function/message testing bot \n This is a cunstomized text")
//         .textFormat("plain")
//         .textLocale("en-us");
//     session.send(customMessage);
//     builder.Prompts()
// });
// function sendProactiveMessage(address) {
// var msg = new builder.Message().address(address);
// msg.text('Hello, this is a notification');
// msg.textLocale('en-US');
// bot.send(msg);
// }

var bot = new builder.UniversalBot(connector);

// handle the proactive initiated dialog
bot.dialog('/survey', function (session, args, next) {
  if (session.message.text === "done") {
    session.send("Great, back to the original conversation");
    session.endDialog();
  } else {
    session.send('Hello, I\'m the survey dialog. I\'m interrupting your conversation to ask you a question. Type "done" to resume');
  }
});

// initiate a dialog proactively
function startProactiveDialog(address) {
  bot.beginDialog(address, "*:/survey");
}

var savedAddress;
server.post('/api/messages', connector.listen());

// Do GET this endpoint to start a dialog proactively
server.get('/api/CustomWebApi', function (req, res, next) {
  startProactiveDialog(savedAddress);
  res.send('triggered');
  next();
});

// root dialog
bot.dialog('/', function (session, args) {

  savedAddress = session.message.address;

  var message = 'Hey there, I\'m going to interrupt our conversation and start a survey in a few seconds.';
  session.send(message);

  message = 'You can also make me send a message by accessing: ';
  message += 'http://localhost:' + server.address().port + '/api/CustomWebApi';
  session.send(message);

  setTimeout(() => {
    startProactiveDialog(savedAddress);
  }, 5000);
});