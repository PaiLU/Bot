var fs = require('fs');
var modelFileName = './sitLUISmodel.json';
var fileName = 'sitLeaveBot.json'
var data = JSON.parse(fs.readFileSync(modelFileName,'utf8'));
var sitLeaveType = JSON.parse(fs.readFileSync('./allLeaveType.json'));
var modelFeatures = JSON.parse(fs.readFileSync('./modelFeatures.json'));

//import entities(leaveTypes)
for (var i in sitLeaveType.allLeaveType){
  var beforeEntityText = ["","take ","apply "];
  data.entities.push(sitLeaveType.allLeaveType[i]);
  var entityText = [];
  entityText.push(sitLeaveType.allLeaveType[i].name);
  for (var j in modelFeatures.model_features){
    if (sitLeaveType.allLeaveType[i].name == modelFeatures.model_features[j].name){
      var word = modelFeatures.model_features[j].words.split(",");
      for (var k in word)
        entityText.push(word[k]);
    };
  };
  var afterEntityText = [""," from 2 jan to 3 feb"];
  for (var l in beforeEntityText){
    for (var m in entityText){
      for (var n in afterEntityText)
        data.utterances.push(makeUtterance("applyLeave",sitLeaveType.allLeaveType[i].name,beforeEntityText[l],entityText[m],afterEntityText[n]));
    }
  };
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
