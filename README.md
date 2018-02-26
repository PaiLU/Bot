This is a Bot Framework Testing Repository
==========
## Table of Content
* [Dialogs](#Dialogs)
* [Messages](#Messages)
* [Channels](#Channels)
* [State Data](#State-Data)
* [Recognize Intent](#Rcognize-intent)
* [Events](#User-and-conversation-events)

## Dialogs

## Messages
Defalut handler
send:   ``sesson.send()``// Can send message object
receive:``session.message``// Read message object from input

Use ``message`` object:
```js
var message = new builder.Message(session)
    .text("Hello")
    .textFormat("plain")// plain|markdown|xml, default is markdown
    .textLocale("en-us");
session.send(message);
```
|METHOD | DESCRIPTION|
|-------|------------|
|addAttachment(attachment:AttachmentType)| Adds an attachment to a message|
|addEntity(obj:Object)| Adds an entity to the message|
|address(adr:IAddress)| Address routing information for the message. To send user aproactive message, save the message's address in the userData bag.|
|attachmentLayout(style:string) |Hint for how clients should layout multiple attachments. The default value is 'list'.|
|attachments(list:AttachmentType) |A list of cards or images to send to the user.|
|compose(prompts:string[], ...args:any[]) |Composes a complex and randomized reply to the user.|
|entities(list:Object[])| Structured objects passed to the bot or user.|
|inputHint(hint:string)| Hint sent to user letting them know if the bot is expecting further input or not. The built-in prompts will automatically populate this value for outgoing messages.|
|localTimeStamp((optional)time:string)| Local time when message was sent (set by client or bot, Ex: 2016-09-23T13:07:49.4714686-07:00.)|
|originalEvent(event:any)| Message in original/native format of the channel for incoming messages.|
|sourceEvent(map:ISourceEventMap)| For outgoing messages can be used to pass source specific event data like custom attachments.|
|speak(ssml:TextType, ...args:any[])| Sets the speak field of the message as Speech Synthesis Markup Language (SSML). This will be spoken to the user on supported devices.|
|suggestedActions(suggestions:ISuggestedActions | IIsSuggestedActions)|Optional suggested actions to send to the user. Suggested actions will be displayed only on the channels that support suggested actions.|
|summary(text:TextType, ...argus:any[])| Text to be displayed as fall-back and as short description of the message content in (e.g.: List of recent conversations.)|
|text(text:TextType, ...args:any[])| Sets the message text.|
|textFormat(style:string)| Set the text format. Default format is markdown.|
|textLocale(locale:string)| Set the target language of the message.|
|toMessage()| Gets the JSON for the message.|
|composePrompt(session:Session, prompts:string[], args?:any[])| Combines an array of prompts into a single localized prompt and then optionally fills the prompts template slots with the passed in arguments.|
|randomPrompt(prompts:TextType)| Gets a random prompt from the array of *prompts* that is passed in|
## Channels
## State Data
## Recognize intent
### Recognize intent form message content
### Recognize intent with LUIS
## User and conversation events
## Support locallization
## Use back channel mechanism
## Payment
## Azure Search