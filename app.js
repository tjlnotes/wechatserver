"use strict"

var Koa = require('koa');
var path = require('path');
var wechat = require('./wechat/g');
var util = require('./libs/util');
var wechat_file = path.join(__dirname, './config/wechat.txt');

var config = {
    wechat: {
        appID: "wx9ae0bdfd2f1e5816",
        appSecret: "0623f7ed6f3082060a69f5e4a77c2652",
        token: "iloveyangmi",
        getAccessToken: function() {
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken: function(data) {
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file, data);
        }
    }
}

var app = new Koa();

app.use(wechat(config.wechat));

app.listen(1234);
console.log("listen 1234")