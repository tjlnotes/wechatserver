var Koa = require("koa");
var sha1 = require("sha1");
var config = {
    wechat: {
        appid: "wx9ae0bdfd2f1e5816",
        appsecret: "wx9ae0bdfd2f1e5816",
        token: "iloveyangmi"
    }
}

var app = new Koa();

app.use(function *(next) {
    console.log(this.query);

    var token = config.wechat.token;
    var nonce = this.query.nonce;
    var timestamp = this.query.timestamp;
    var echostr = this.query.echostr;
    var signature = this.query.signature;

    var str = [token,timestamp,nonce].sort().join("");

    var sha = sha1(str);
    console.log(sha);

    if(sha === signature) {
        this.body = echostr;
    }
    
})

app.listen(8080);
console.log("listen 8080")