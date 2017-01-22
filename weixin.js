'use strict'

var config = require('./config');
var Wechat = require('./wechat/wechat');
var wechatApi = new Wechat(config.wechat);

exports.reply = function* (next) {
    var message = this.weixin;
    if (message.MsgType === 'event') {
        console.log("------------------message:");
        console.log(message);
        console.log(message.MsgType);
        console.log(message.Event);
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log('扫描二维码进来：' + message.EventKey + '' + message.ticket)
            }

            this.body = '你订阅了这个号\r\n' + '消息ID:' + message.MsgId;
        }
        else if (message.Event === 'unsubscribe') {
            console.log('取消关注');
            this.body = '';
        }
        else if (message.Event === 'LOCATION') {
            this.body = '您上报的位置是： ' + message.Latitude + '/' +
                message.longitude + '-' + message.EventKey;
        }
        else if (message.Event === 'CLICK') {
            console.log('您点击了菜单： ' + message.EventKey);
        }
        else if (message.Event === 'SCAN') {
            console.log('关注后扫二维码' + message.EventKey + ' ' + message.Ticket);
            this.body = '看到了扫一下';
        }
        else if (message.Event === 'VIEW') {
            this.body = '您点击了菜单中的链接：' + message.EventKey;
        }
    }
    else if (message.MsgType === 'text') {
        var content = message.Content;
        var reply = '你说的' +　message.Content + '太复杂了'

        if (content === '1') {
            reply = "you've send 1";
        }
        else if (content === '2') {
            reply = "you've send 2";
        }
        else if (content === '3') {
            reply = "you've send 3";
        }
        else if (content === '4') {
            reply = [{
                title: '技术改变世界',
                description: '此处仅仅是个测试描述',
                picUrl: 'http://pic.58pic.com/58pic/15/35/05/95258PICQnd_1024.jpg',
                url: 'http://www.baidu.com'
            },{
                title: 'nodejs 微信开发',
                description: '此处仅仅是个测试描述',
                picUrl: 'http://image.elegantliving.ceconline.com/320000/320100/20110815_03_52.jpg',
                url: 'http://www.baidu.com'
            }];
        }
        else if (content === '5') {
            var data = yield wechatApi.uploadMaterial('image', __dirname + '/2.jpg')

            reply = {
                type: 'image',
                mediaId: data.media_id
            }
        }
        this.body = reply;
    }

    yield next;
}