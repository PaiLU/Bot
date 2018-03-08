var fs = require('fs');
var modelFileName = './sitLUISmodel.json';
var fileName = 'sitLeaveBot.json'
var data = JSON.parse(fs.readFileSync(modelFileName,'utf8'));
var sitLeaveType = JSON.parse(fs.readFileSync('./allLeaveType.json'));
var modelFeatures = JSON.parse(fs.readFileSync('./modelFeatures.json'));
var otherUtterances = JSON.parse(fs.readFileSync('./utterances.json'));

//import applyLeave intent and entities(leaveTypes)
  data.intents.push({"name": "applyLeave"});
  data.entities.push({"name": "leaveType"});
  for (var i in sitLeaveType.leaveType){ 
    var beforeEntityText = ["","take ","apply "];
    var entityText = [];
    entityText.push(sitLeaveType.leaveType[i].name);
    for (var j in modelFeatures.model_features){
      if (sitLeaveType.leaveType[i].name == modelFeatures.model_features[j].name){
        data.model_features.push(modelFeatures.model_features[j]);
        var word = modelFeatures.model_features[j].words.split(",");
        for (var k in word)
          entityText.push(word[k]);
      };
    };
    var afterEntityText = [""," from 2 jan to 3 feb"];
    for (var l in beforeEntityText){
      for (var m in entityText){
        for (var n in afterEntityText)
          data.utterances.push(makeUtterance("applyLeave","leaveType",beforeEntityText[l],entityText[m],afterEntityText[n]));
      }
    };
  };
// import other intents and utternces (reqStatus, help)
  for (var otherIntent in otherUtterances){
    data.intents.push({"name" : otherIntent});
    for (var o in otherUtterances[otherIntent])
      data.utterances.push(otherUtterances[otherIntent][o]);
  };

var jsonData = JSON.stringify(data);
fs.writeFile(fileName, jsonData, function(err) {
    if(err) {
        return console.log(err);
    }
});
console.log("Done on generating "+fileName);

function makeUtterance(intent,entity,beforeEntityText,entityText,afterEntityText){
  var a ={
    "text": beforeEntityText + entityText + afterEntityText,
    "intent": intent,
    "entities": [
      {
        "entity": entity,
        "startPos": beforeEntityText.length,
        "endPos": beforeEntityText.length+entityText.length-1
      }
    ]
  };
  return a;
}
