var fs = require('fs');
var a = JSON.parse(fs.readFileSync('./LeaveBot_old.json'));
var c = {"reqStatus":[],"help":[],"None":[]};
for (var b in a.utterances){
    if (a.utterances[b].intent == "reqStatus")
        c.reqStatus.push(a.utterances[b]);
    if (a.utterances[b].intent == "help")
        c.help.push(a.utterances[b]);
    if (a.utterances[b].intent == "None")
        c.None.push(a.utterances[b]);
};
var d = JSON.stringify(c);
console.log(c);
fs.writeFile('utterances.json', d, function(err) {
    if(err) {
        return console.log(err);
    }
});