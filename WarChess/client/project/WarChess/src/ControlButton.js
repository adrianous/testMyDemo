/**
 * Created by yangyanfei on 16/1/4.
 */


var ControlButton = cc.MenuItemImage.extend({
    _role:null,//按钮上的英雄
    _mark:null,
    _state:BUTTONSTATE.AWAIT,
    //_controlRole:null,
    _controlButton:null,
    _movePath:null,
    _attackRole:null,

    ctor:function(callBack,tag){
        cc.spriteFrameCache.addSpriteFrames(res_gaming.menu_plist);
        this._super("#3.png","#3.png",callBack);
        this.setTag(tag);
        this.setPosition(GM_MAP.getPositionByTag(tag));

        this._mark = new cc.Sprite();
        this._mark.setPosition(cc.p(this.getContentSize().width*0.5,this.getContentSize().height*0.5));
        this.addChild(this._mark);
    },
    showMoveMark:function(){
        var frame = cc.spriteFrameCache.getSpriteFrame("2.png");
        this._mark.setSpriteFrame(frame);
        this._state = BUTTONSTATE.CANMOVE;
    },

    reset:function(){
        var frame = cc.spriteFrameCache.getSpriteFrame("3.png");
        this._mark.setSpriteFrame(frame);
        this._state = BUTTONSTATE.AWAIT;
    }

    //showNormalMark:function(){
    //    var frame = cc.spriteFrameCache.getSpriteFrame("3.png");
    //    this._mark.setSpriteFrame(frame);
    //    this._state = BUTTONSTATE.AWAIT;
    //    this._controlButton = null;
    //    this._movePath = null;
    //    this._attackRole = null;
    //},

    //turnBegain:function(){
    //    var frame = cc.spriteFrameCache.getSpriteFrame("3.png");
    //    this._mark.setSpriteFrame(frame);
    //    this._state = BUTTONSTATE.AWAIT;
    //},
    //openTouch:function(){
    //    this._state = BUTTONSTATE.AWAIT;
    //    this._controlButton = null;
    //    this._movePath = null;
    //    this._attackRole = null;
    //    if(this._role != null){
    //        this._role._state = ROLESTATE.AWAIT;
    //    }
    //},
    //closeTouch:function(){
    //    this._controlButton = null;
    //    this._movePath = null;
    //    this._attackRole = null;
    //    var frame = cc.spriteFrameCache.getSpriteFrame("3.png");
    //    this._mark.setSpriteFrame(frame);
    //}
});