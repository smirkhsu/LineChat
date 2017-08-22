var linebot = require('linebot');
var express = require('express');

var bot = linebot({
  channelId:1530656843,
  channelSecret:"2e821d557b98b077497ae5b5ad1d9b95",
  channelAccessToken:"oTEtHgzuiDtqd61VAfQebC2W6neeYUVicjRGo1nB+tgwUt7ySj9MYzHkVhF+Po3DYQWyWrPnromZWRID37Cwl3cq47TOn680VteO43JMHnsEjPMBh6HyPK/xmA0J/sdfqcB3FqZrIhLyJUnlOFKILwdB04t89/1O/w1cDnyilFU="
});

bot.on('message', function(event) {
  if (event.message.type = 'text') {
    var msg = "重複您的文字：\n" + event.message.text;
    event.reply(msg).then(function(data) {
      // success 
      console.log(msg);
    }).catch(function(error) {
      // error 
      console.log('error');
    });
  }
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});

	
