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
        }
    }
    else {

    }
}