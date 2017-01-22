'use strict'

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
            reply = "you've send 4";
        }
        else if (content === '5') {
            reply = "you've send 5";
        }
        this.body = reply;
    }

    yield next;
}