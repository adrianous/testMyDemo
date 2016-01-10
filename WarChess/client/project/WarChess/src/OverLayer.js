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

    ctor:function(){
        this._super();
        this.loadCCB("OverLayer",res_gaming.OverLayer);
        //cc.spriteFrameCache.addSpriteFrames(res_image.Emoji_plist);

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
        this.initInfo();
        //this.rootNode.animationManager.runAnimationsForSequenceNamed("action_head");
    },

    onEnter:function(){
        this._super();
        cc.eventManager.addCustomListener(Response.msgId_again,this.receiveAgainMsg.bind(this));
        cc.eventManager.addCustomListener(Response.msgId_tiaoxi,this.receiveTiaoxiMsg.bind(this));
    },
    onExit:function(){
        this._super();
        cc.eventManager.removeCustomListeners(Response.msgId_again);
        cc.eventManager.removeCustomListeners(Response.msgId_tiaoxi);
    },

    initInfo:function(){
        //if(GAME_OP_PLAYER.isExit){
        //    GAME_OP_PLAYER.score = 0;
        //    this._result = 1;
        //
        //    //this.again.setVisible(false);
        //    //this.tiaoxi.setVisible(false);
        //    //this.op_leave.setVisible(true);
        //    //this.op_ready.setVisible(false);
        //
        //}else{
        //    this.schedule(this.updateExit);
        //
        //    //if(GAME_SF_PLAYER.score > GAME_OP_PLAYER.score){
        //    //    this._result = 1;
        //    //
        //    //    this.score_up.setString(GAME_SF_PLAYER.score);
        //    //    this.score_down.setString(GAME_OP_PLAYER.score);
        //    //}else {
        //    //    this._result = 2;
        //    //    this.score_up.setString(GAME_OP_PLAYER.score);
        //    //    this.score_down.setString(GAME_SF_PLAYER.score);
        //    //    this.tiaoxi.setVisible(false);
        //    //}
        //®
        //}
        //
        //
        //
        ////设置头像

        cc.loader.loadImg(SF_INFO.iconUrl, function(err,img){
            var sprite  = new cc.Sprite(img);
            var head = GAME_TOOLS.getHead(sprite);
            //head.setPosition(this.sf_head_pos.getPosition());
            this._myNode.getChildByTag(2).addChild(head);
        }.bind(this));

        //cc.loader.loadImg(GAME_OP_PLAYER.iconUrl, function(err,img){
        //    var sprite  = new cc.Sprite(img);
        //    var head = GAME_TOOLS.getHead(sprite,false);
        //    //head.setPosition(this.op_head_pos.getPosition());
        //    this.op_head_pos.addChild(head);
        //}.bind(this));
        //
        //
        //this.sf_name.setString(GAME_SF_PLAYER.nickname);
        //this.op_name.setString(GAME_OP_PLAYER.nickname);
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
        this.sf_ready.setVisible(true);
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
        if(GAME_OP_PLAYER.isExit){
            this.unschedule(this.updateExit);
            this.again.setVisible(false);
            this.tiaoxi.setVisible(false);
            this.op_leave.setVisible(true);
            this.op_ready.setVisible(false);
            this._rtAction.playExit();
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
        this.op_ready.setVisible(true);
        this._rtAction.playReady();
    },
    receiveTiaoxiMsg:function(event){
        var jsonData = event.getUserData();
        var index = jsonData.index;
        cc.audioEngine.playEffect(res_image.effect_tiaoxi);
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
    sendAgainMsg:function(){
        var againMsg = new AgainMsg();
        global_network.sendMessage(againMsg);
    },
    sendTiaoxiMsg:function(){
        var tiaoxiMsg = new TiaoxiMsg();
        var index = Math.floor(Math.random()*10)%4 + 1;
        tiaoxiMsg.content.index = index;
        global_network.sendMessage(tiaoxiMsg);


        var sp = new cc.Sprite("#tiaoxi_" + index + ".png");
        var width = this.op_leave.getContentSize().width;
        sp.setScale(width/sp.getContentSize().width);
        sp.setPosition(this.tiaoxi.getParent().convertToWorldSpace(this.tiaoxi.getPosition()));
        this.addChild(sp,1111);


        var toPos = this.op_head_bg.convertToWorldSpace(this.op_ready.getPosition());//

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