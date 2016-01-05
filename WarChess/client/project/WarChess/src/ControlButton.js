/**
 * Created by yangyanfei on 16/1/4.
 */


var ControlButton = cc.MenuItemImage.extend({
    _role:null,//按钮上的英雄
    _mark:null,
    _state:BUTTONTYPE.AWAIT,
    _controlRole:null,
    _movePath:null,
    ctor:function(callBack,pos,tag){
        cc.spriteFrameCache.addSpriteFrames(res_gaming.menu_plist);
        this._super("#3.png","#3.png",callBack);
        this.setPosition(pos);
        this.setTag(tag);

        this._mark = new cc.Sprite();
        this._mark.setAnchorPoint(cc.p(0,0));
        this.addChild(this._mark);
    },
    showMoveMark:function(){
        var frame = cc.spriteFrameCache.getSpriteFrame("2.png");
        this._mark.setSpriteFrame(frame);
        this._state = BUTTONTYPE.CANMOVE;
    },
    showAttakMark:function(){
        var frame = cc.spriteFrameCache.getSpriteFrame("1.png");
        this._mark.setSpriteFrame(frame);
        this._state = BUTTONTYPE.CANATTACK;
    },
    showNormalMark:function(){
        var frame = cc.spriteFrameCache.getSpriteFrame("3.png");
        this._mark.setSpriteFrame(frame);
        this._state = BUTTONTYPE.AWAIT;
        this._controlRole = null;
        this._movePath = null;
    }
});