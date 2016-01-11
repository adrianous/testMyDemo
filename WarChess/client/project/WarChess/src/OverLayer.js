/**
 * Created by john on 16/1/9.
 */
/**
 * Created by yangyanfei on 15/11/11.
 */


var OverLayer = BaseLayer.extend({

    _result:0,//0:平局,1:胜,2:负
    _targetScore:0,
    _tempScore:0,

    _tiaoxiSp:null,
    _tiaoxiTime:3,
    _width:0,
    _height:0,
    _spWidth:0,
    _spHeight:0,

    _myNode:null,
    _opNode:null,
    _dialogLayer:null,

    ctor:function(){
        this._super();
        this.loadCCB("OverLayer",res_gaming.OverLayer);
        cc.spriteFrameCache.addSpriteFrames(res_gaming.emojiPlist);

        this._width = cc.director.getWinSize().width;
        this._height = cc.director.getWinSize().height;

        if(SF_INFO.teamIndex == TEAMTYPE.ALLIANCE)
        {
            this._myNode = this.allianceNode;
            this._opNode = this.tribeNode;
        }

    },

    completedAnimationSequenceNamed:function(animationName){
        if(animationName == "moveHead"){
            switch (this._result){
                case 1:
                {
                    this.rootNode.animationManager.runAnimationsForSequenceNamed("win");
                    break;
                }
                case 2:
                {
                    this.rootNode.animationManager.runAnimationsForSequenceNamed("lose");
                    break;
                }
            }
        }else if(animationName == "action_win"){
            //if(GAME_OP_PLAYER.isExit){
            //    this._rtAction.playExit();
            //}
            //this.schedule(this.updateStar,1.3);

        }else if(animationName == "action_lose"){
            //this.leftFly.setVisible(true);
            //this.leftShit.setVisible(true);
            //this.rightFly.setVisible(true);
            //this.rightShit.setVisible(true);
        }
    },

    onDidLoadFromCCB:function(ccbFileName){
        //this._rtAction = new ActionLayer();
        //this.op_head_bg.addChild(this._rtAction,1000);
        //this.rootNode.animationManager.runAnimationsForSequenceNamed("action_head");
    },

    onEnter:function(){
        this._super();
        this.initInfo();

        cc.eventManager.addCustomListener(Response.msgId_refight,this.receiveAgainMsg.bind(this));
        cc.eventManager.addCustomListener(Response.msgId_joker,this.receiveTiaoxiMsg.bind(this));
    },
    onExit:function(){
        this._super();
        cc.eventManager.removeCustomListeners(Response.msgId_refight);
        cc.eventManager.removeCustomListeners(Response.msgId_joker);
    },

    initInfo:function(){
        this._dialogLayer = new DialogLayer ();
        this.addChild(this._dialogLayer);
        //this._dialogLayer.playLeave();
        if(OP_INFO.isExit){
            //GAME_OP_PLAYER.score = 0;
            this._result = 1;

            this.again.setVisible(false);
            this.jokerBtn.setVisible(false);
            this._opNode.getChildByTag(3).setVisible(true);
            this._opNode.getChildByTag(4).setVisible(false);
            this._dialogLayer.playLeave();

        }else{
            this.schedule(this.updateExit);
            if(this._result == 1)
            {
                this.jokerBtn.setVisible(true);
            }
            else
            {
                this.jokerBtn.setVisible(false);
                this.again.setPosition(cc.p(0,-20));
            }

        }



        ////设置头像

        cc.loader.loadImg(SF_INFO.iconUrl, function(err,img){
            var sprite  = new cc.Sprite(img);
            var head = GAME_TOOLS.getHead(sprite);
            //head.setPosition(this.sf_head_pos.getPosition());
            this._myNode.getChildByTag(1).addChild(head);
            //head.setLocalZOrder(98);
            //this._myNode.addChild(head);
            head.setPosition(cc.p(42,42));
        }.bind(this));

        cc.loader.loadImg(OP_INFO.iconUrl, function(err,img){
            var sprite  = new cc.Sprite(img);
            var head = GAME_TOOLS.getHead(sprite);
            this._opNode.getChildByTag(1).addChild(head);
            //head.setLocalZOrder(98);
            //this._myNode.addChild(head);
            head.setPosition(cc.p(42,42));
        }.bind(this));

        this._myNode.getChildByTag(2).setString(SF_INFO.nickname);
        this._opNode.getChildByTag(2).setString(OP_INFO.nickname);
    },


    playWin:function()
    {
        this._result = 1;
        this.rootNode.animationManager.runAnimationsForSequenceNamed("moveHead");
    },

    playLose:function()
    {
        this._result = 2;
        this.rootNode.animationManager.runAnimationsForSequenceNamed("moveHead");
    },

    playOneExit:function()
    {

    },


    playFirework:function(){
        for(var i = 1; i < 11;i ++){
            var meterrName = "particle_" + i;
            this[meterrName].setVisible(true);
            this[meterrName].visit();
        }
        this.schedule(this.updateFileWork,0,4);
    },

    onAgainPress:function(){
        this.again.setEnabled(false);
        this._myNode.getChildByTag(4).setVisible(true);
        this._myNode.getChildByTag(4).setLocalZOrder(100);
        this.sendAgainMsg();
    },

    onTiaoxiPress:function(){
        this.sendTiaoxiMsg();
    },

    updateStar:function(){
        var star = new cc.Sprite("#ui_star.png");
        star.x = Math.random() * 270 + 350;
        star.y = Math.random() * 60 + 430;

        star.setOpacity(0);
        var act1 = new cc.FadeTo(0.2,255);
        var act2 = new cc.DelayTime(0.5);
        var act3 = new cc.FadeTo(0.5,0);
        var act4 = new cc.callFunc(function(node){
            node.removeFromParent(true);
            this._starNum--;
        }.bind(this));
        star.runAction(new cc.Sequence(act1,act2,act3,act4));
        this.addChild(star,10000);
    },

    updateExit:function(){
        if(OP_INFO.isExit){
            this.unschedule(this.updateExit);
            this.again.setVisible(false);
            this.jokerBtn.setVisible(false);
            this._opNode.getChildByTag(3).setVisible(true);
            this._opNode.getChildByTag(4).setVisible(false);
            this._dialogLayer.playLeave();
        }

    },
    updateTiaoxi:function(dt){
        this._tiaoxiTime -= dt;

        if(this._tiaoxiTime <= 2.7){
            this._speed = 7000;
        }else{
            this._speed = 500;
        }

        if(this._tiaoxiTime <= 0){
            this.unschedule(this.updateTiaoxi);
            var action1 = new cc.FadeOut(0.5);
            var action2 = new cc.callFunc(function(node){
                this._tiaoxiSp.removeFromParent(true);
                this._tiaoxiSp = null;
            }.bind(this));
            this._tiaoxiSp.runAction(new cc.Sequence(action1,action2));
        }
        if(this._tiaoxiSp.getNumberOfRunningActions() == 0){
            var toPos = cc.p(this._width*Math.random()-this._spWidth*0.5, this._height*Math.random() -this._spHeight*0.5);
            if(toPos.x<this._spWidth*0.5)
            {
                toPos.x = this._spWidth*0.5;
            }
            if(toPos.y<this._spHeight*0.5)
            {
                toPos.y = this._spHeight*0.5;
            }
            var time = cc.pDistance(this._tiaoxiSp.getPosition(), toPos)/this._speed;
            this._tiaoxiSp.runAction(new cc.MoveTo(time,toPos));



            var effectIndex = Math.floor(Math.random()*10)%4 + 1;
            var effectName = "effect_tiaoxi"+effectIndex;
            cc.audioEngine.playEffect(res_image[effectName]);
        }
    },
    receiveAgainMsg:function(event){
        this._opNode.getChildByTag(4).setVisible(true);
        this._dialogLayer.playRefight();
        this._rtAction.playReady();
    },
    receiveTiaoxiMsg:function(event){
        var jsonData = event.getUserData();
        var index = jsonData.index;
        //cc.audioEngine.playEffect(res_image.effect_tiaoxi);
        if(this._tiaoxiSp == null){
            this._tiaoxiSp = new cc.Sprite("#tiaoxi_" + index + ".png");
            this._tiaoxiSp.setPosition(this.op_head_bg.convertToWorldSpace(this.op_ready.getPosition()));//
            this.addChild(this._tiaoxiSp,1111);
            this._spWidth = this._tiaoxiSp.getContentSize().width;
            this._spHeight = this._tiaoxiSp.getContentSize().height;
            this.schedule(this.updateTiaoxi);
            this._tiaoxiTime = 3;
        }else{
            var frame = cc.spriteFrameCache.getSpriteFrame("tiaoxi_" + index +".png");
            this._tiaoxiSp.setSpriteFrame(frame);
            this._tiaoxiTime = 3;
        }

        //处理
    },

    sendAgainMsg:function()
    {
        var againMsg = new RefightMsg();
        global_network.sendMessage(againMsg);
    },

    sendTiaoxiMsg:function(){
        var tiaoxiMsg = new JokerMsg();
        var index = Math.floor(Math.random()*10)%4 + 1;
        tiaoxiMsg.content.index = index;
        global_network.sendMessage(tiaoxiMsg);

        var sp = new cc.Sprite("#tiaoxi_" + index + ".png");
        var width = this._opNode.getChildByTag(3).getContentSize().width;
        sp.setScale((width/sp.getContentSize().width)*this._opNode.getScale());
        sp.setPosition(this.jokerBtn.getParent().convertToWorldSpace(this.jokerBtn.getPosition()));
        this.addChild(sp,1111);

        var toPos = this._opNode.convertToWorldSpace(this._opNode.getChildByTag(3).getPosition());//

        var act1 = new cc.MoveTo(0.3,toPos);

        var act2 = new cc.RotateBy(0.3,360);

        var action1 = new cc.Spawn(act1,act2);
        var action2 = new cc.DelayTime(1.0);
        var action3 = new cc.FadeOut(0.5);
        var action4 = new cc.callFunc(function(node){
            node.removeFromParent(true);
        });

        sp.runAction(new cc.Sequence(action1,action2,action3,action4));
        //做一个动画
    }

});