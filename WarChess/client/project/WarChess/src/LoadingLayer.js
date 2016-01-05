/**
 * Created by yangyanfei on 15/5/23.
 */
var LoadingLayer = BaseLayer.extend({
    _isLoaded : false,
    _isStart : false,
    _isSend : false,
    _stencil:null,
    _clipper:null,
    ctor:function(){
        this._super();
        this.loadCCB("LoadingLayer",res_loading.loading_ccbi);
    },
    addDial:function(){
        this.openConnect();
        this.scheduleUpdate();
        this.loadResource();
    },

    completedAnimationSequenceNamed:function(animationName){
        if(animationName == "action_loaded"){
            this._isLoaded = true;
            this._isStart = true;

        }
    },
    onDidLoadFromCCB:function(ccbFileName){
        this._stencil = new cc.Sprite("#ui_loading_b_01.png");
        this._stencil.setScaleX(0);
        this._stencil.setAnchorPoint(cc.p(0,0));
        this._clipper = new cc.ClippingNode(this._stencil);
        var greenSp = new cc.Sprite("#ui_loading_b_01.png");
        greenSp.setAnchorPoint(cc.p(0,0));
        this._clipper.addChild(greenSp);
        this._clipper.setAnchorPoint(cc.p(0,0));
        this.progressBg.addChild(this._clipper);

        this.colorLayer.setColor(cc.color(254,210,85,255));
    },

    onEnter:function(){
        this._super();
        cc.eventManager.addCustomListener(Response.msgId_connect,this.receiveConnectMsg.bind(this));
        cc.eventManager.addCustomListener(Response.msgId_start,this.receiveStartMsg.bind(this));
        cc.eventManager.addCustomListener(Response.msgId_exit,this.receiveExitMsg.bind(this));
        this.addDial();
    },
    onExit:function(){
        this._super();
        cc.eventManager.removeCustomListeners(Response.msgId_connect);
        cc.eventManager.removeCustomListeners(Response.msgId_start);
        cc.eventManager.removeCustomListeners(Response.msgId_exit);
    },

    loadResource:function(){
        var loadedNum = 0;
        var allNum = Object.keys(res_gaming).length;
        for(var i in res_gaming){
            cc.loader.load(res_gaming[i],function(){
                loadedNum++;
                this._stencil.setScaleX(loadedNum/allNum);
                this._clipper.visit();
                if(loadedNum == allNum){
                    this.rootNode.animationManager.runAnimationsForSequenceNamed("action_loaded");
                    //SM.geInstance().runGameScene();
                }
            },this);
        }
    },

    openConnect:function(){

        var jsonObj = null;
        var isTest = true;
        if(isTest){
            var str = '{"roomId":"room_1","gameId":"WARCHESS_DEBUG","userId":"userId2","sessionKey":1,"gameServerIP":"ws://192.168.0.203:10151"}';
            jsonObj = JSON.parse(str);
        }else
        {
            var arr = window.location.href.split("?");
            var tmpStr = arr[1];
            var regS = new RegExp("%22","g");
            var result = tmpStr.replace(regS,"\"");
            var result1 = result.replace("%7B","{");
            var result2 = result1.replace("%7D","}");
            jsonObj = JSON.parse(result2);
        }

        global_roomId = jsonObj.roomId;
        global_gameId = jsonObj.gameId;
        global_userId = jsonObj.userId;
        global_sessionKey = jsonObj.sessionKey;
        global_serverUrl = jsonObj.gameServerIP;

        //联网
        global_network = new NetWork(global_serverUrl);
        global_network.openConnect();
    },
    receiveConnectMsg:function(event){
        var data = event.getUserData();
        var players = data.players;
        for(var i in players){
            if(players[i].userId == global_userId){
                SF_INFO.userId = players[i].userId;
                SF_INFO.nickname = players[i].nickname;
                SF_INFO.iconUrl = players[i].iconUrl;
            }else{
                OP_INFO.userId = players[i].userId;
                OP_INFO.nickname = players[i].nickname;
                OP_INFO.iconUrl = players[i].iconUrl;
            }
        }
    },

    receiveStartMsg:function(event){
        var data = event.getUserData();

        SF_INFO.teamIndex = data.teamType;
        OP_INFO.teamIndex = 3-data.teamType;

        this._isStart = true;
        cc.log("asdfasdfasdfaff");
    },

    receiveExitMsg:function(event){

    },
    
    update:function(dt){
        if(this._isStart)
        {
            cc.director.runScene(new GameScene());
            this.unscheduleUpdate();
        }

        //if(global_isConnect && !this._isSend && this._isLoaded){
        if(global_isConnect && !this._isSend && this._isLoaded ){

            this._isSend = true;
            var connectMsg = new EnterMsg();
            global_network.sendMessage(connectMsg);
        }
    }
});

var LoadingScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        this.loadLoading();
    },
    loadLoading:function(){
        var loadedNum = 0;
        var allNum = Object.keys(res_loading).length;
        for(var i in res_loading){
            cc.loader.load(res_loading[i],function(){
                loadedNum++;
                if(loadedNum == allNum){
                    var layer = new LoadingLayer();
                    this.addChild(layer);
                }
            },this);
        }
    }
});