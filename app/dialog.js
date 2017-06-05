
 exports.dialog = function(qId, answerExpected, speech, obj, callback) {
        var data={};
        var qIdNext;


console.log(answerExpected + "-" + speech)
     if (answerExpected == speech) {
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
 