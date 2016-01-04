/**
 * Created by yangyanfei on 15/5/27.
 */


var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;


//全局变量gn
var global_network = null;//控制网络连接的对象
var global_roomId = null;//房间id
var global_gameId= null;//游戏id
var global_userId = null;//玩家id
var global_sessionKey = null;
var global_serverUrl = null;//游戏服务器地址
var global_isConnect = false;



var NetWork = function(url){
    this.url = url;
    this.websocket = null;
};

NetWork.prototype = {
    //开启连接
     openConnect:function() {

        var self = this;
        this.websocket = new WebSocket(this.url);


        this.websocket.onopen = function(evt) {
            cc.log("Send Text WS was opened ");
            global_isConnect = true;
        };

        this.websocket.onmessage = function(evt) {
            cc.log("收到消息了"+ evt.data);
            self.receiveMessage(evt.data);

        };

        this.websocket.onerror = function(evt) {
            cc.log("Error was fired ");
        };

        this.websocket.onclose = function(evt) {
            cc.log(" websocket instance closed.");
            this.websocket = null;
        };
     },

    //关闭连接
    closeConnect:function(){
        this.websocket.close();
    },

    //发送消息
    sendMessage:function(data){

        if (this.websocket.readyState == WebSocket.OPEN)
        {
            var content  = JSON.stringify(data.content);
            data.content = content;
            var jsonStr = JSON.stringify(data);
            this.websocket.send(jsonStr);
        }

    },

    //接收消息
    receiveMessage:function(data){
        var jsonObj = JSON.parse(data);
        var data = JSON.parse(jsonObj.content);
        cc.eventManager.dispatchCustomEvent(jsonObj.msgId,data);

    }

};

