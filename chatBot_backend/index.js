const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
var express = require('express');
var cors = require('cors')

var app = express();
app.use(cors())
const workspaceId = '0eb7b295-a6ee-4c2b-8e8d-81992785a284'
var contexts = [];
const messageAsync = function (text, context) {
    const payload = {
      workspaceId: '0eb7b295-a6ee-4c2b-8e8d-81992785a284',
      input: {
        text: text,
      },
      context: context,
    };
    return assistant.message(payload);
  };


app.get('/bot', async function(req, res) {
    var message = req.query.Text;
    var sender = req.query.From;
    
  
    var context = null;
    var index = 0;
    var contextIndex = 0;
    contexts.forEach(function(value) {
      console.log(value.from);
      if (value.from == sender) {
        context = value.context;
        contextIndex = index;
      }
      index = index + 1;
    });
  
    console.log('Recieved message from ' + sender + ' saying \'' + message  + '\'');
    
    const assistant = new AssistantV1({
        version: '2019-02-28',
        authenticator: new IamAuthenticator({
          apikey: 'gp_A5FKlKcnP6Fki1jrX5YpGiQB_bRlVqqwkyJtiApPs',
        }),
        url: 'https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/e0ea3678-55fd-4511-90d6-21474551f049',
      });
  
    console.log(JSON.stringify(context));
    console.log(contexts.length);
    let output = ""
    
    
    await assistant.message({
      input: { text: message },
      workspaceId: '0eb7b295-a6ee-4c2b-8e8d-81992785a284',
      context: context
     }, function(err, response) {
         if (err) {
             console.log("Error in getting response")
           console.error(err);
         } else {
            // console.log(JSON.stringify(response))
           console.log(response.result.output.text[0]);
            output = response.result.output.text[0]
           if (context == null) {
             contexts.push({'from': sender, 'context': response.result.context});
           } else {
             contexts[contextIndex].context = response.result.context;
           }
           try{
            var intent = response.result.intents[0].intent;
            console.log(intent);
                if (intent == "bye") {
                    //contexts.splice(contexts.indexOf({'from': number, 'context': response.context}),1);
                    contexts.splice(contextIndex,1);
                    
                }
    
           }catch(e){

           }
           
         }
    });

    res.send({"to": sender, "body": output});
});

app.listen(5000, function () {
console.log('Example app listening on port 5000!');
});

