var linebot = require('linebot');
var express = require('express');

var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var result = ""

var bot = linebot({
  channelId: 1530656843,
  channelSecret: "2e821d557b98b077497ae5b5ad1d9b95",
  channelAccessToken: "oTEtHgzuiDtqd61VAfQebC2W6neeYUVicjRGo1nB+tgwUt7ySj9MYzHkVhF+Po3DYQWyWrPnromZWRID37Cwl3cq47TOn680VteO43JMHnsEjPMBh6HyPK/xmA0J/sdfqcB3FqZrIhLyJUnlOFKILwdB04t89/1O/w1cDnyilFU="
});

bot.on('message', function(event) {
  console.log(event); //把收到訊息的 event 印出來看看
  if (event.message.type = 'text') {
    jp();
    console.log(result);
    var msg = "重複您的文字：\n" + result;
    event.reply(msg).then(function(data) {
      // success 
      console.log(msg);
    }).catch(function(error) {
      // error 
      console.log('error');
    });
  }
});

var jp = function() {
  request({
    url: "http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm",
    method: "GET"
  }, function(error, response, body) {
    if (error || !body) {
      return;
    }
    // 爬完網頁後要做的事情
    // console.log(body);
    var $ = cheerio.load(body);
    var target = $(".rate-content-sight.text-right.print_hide")
    //var result = target[15].children[0].data;
    result = target[15].children[0].data;
  });
};

// setTimeout(function(){
//     var userId = "U6115460e285756fe151d0dd2a090e464";
//     var sendMsg = "阿囉哈～～ＸＤ";
//     bot.push(userId,sendMsg);
//     console.log('send: '+sendMsg);
// },5000);

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});

	
