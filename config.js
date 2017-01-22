'use strict'

var path = require('path');
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

module.exports = config;