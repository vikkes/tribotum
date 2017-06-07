
 exports.dialog = function(qId, answerExpected, speech, obj,commands_json, callback) {
        var data={};
        var qIdNext;
        var commands=["DEFAULT","HOME","UMSATZ","EINKOMMEN"];


//console.log(answerExpected + "-" + speech)

      
      if (commands.indexOf(speech.toUpperCase())>=0 ){
         qIdNext = commands.indexOf(speech.toUpperCase());
         speech= commands_json[commands.indexOf(speech.toUpperCase())];
         
         dataFill(qIdNext,speech);
     }
     else if (answerExpected == speech) {
         //console.log("gleich")
         
         qIdNext = obj[qId]["condition"]["follower"];
         speech = obj[qIdNext];
         
         dataFill(qIdNext,speech);

     }
     
     else if (answerExpected == "text") {
      //console.log("text")
         qIdNext = obj[qId]["condition"]["follower"];
         speech = obj[qIdNext];
         
         dataFill(qIdNext,speech);
     }
     else {
      //console.log("else")
         speech = obj[-1];
         qIdNext = qId;
         dataFill(qIdNext,speech)
         
     }
     
     function dataFill(qIdNext,speech){
         //console.log(qIdNext+"+"+JSON.stringify(speech))
         data["qId"]=qIdNext;
         data["speech"]=speech;
         callback(data);
     }
     
     
 };
 