/**
 * Created by yangyanfei on 16/1/1.
 */
var GM_LAYER = null;
var GameLayer = BaseLayer.extend({
    _mapLayer : null,
    _mainGameLayer : null,
    _statusLayer:null,
    _overLayer:null,
    ctor:function(){
        this._super();


        cc.spriteFrameCache.addSpriteFrames(res_gaming.warChessPlist);

        this._statusLayer = new StatusLayer();
        this._mainGameLayer = new MainGameLayer();
        this.addChild(this._mainGameLayer);
        this._mainGameLayer.addChild(this._statusLayer);

        this._overLayer = new OverLayer();

        this.addChild(this._overLayer);



        var testChooseCardLayer = new ChooseCardLayer();
        this.addChild(testChooseCardLayer);


        cc.eventManager.addCustomListener(Response.msgId_endRound,this.receiveEndRound.bind(this));
        cc.eventManager.addCustomListener(Response.msgId_startRound,this.receiveStartRound.bind(this));
        cc.eventManager.addCustomListener(Response.msgId_move,this.receiveMove.bind(this));
        cc.eventManager.addCustomListener(Response.msgId_attack,this.receiveAttack.bind(this));


    },
    onEnter:function(){
        this._super();
        GM_LAYER = this;

        //debug
        //this.initData();
    },
    onExit:function(){
        this._super();
        GM_LAYER = null;
    },

    initMap:function(){
        this._mapLayer = new MapLayer();
        this._mainGameLayer.addChild(this._mapLayer);
    },
    initData:function(){
        SF_INFO.initLayout();
        OP_INFO.initLayout();
        this.initMap();
        this._mainGameLayer.initPointsLayer();
        if(SF_INFO.teamIndex == TEAMTYPE.ALLIANCE)
            this.turnBegain();
    },

    turnBegain:function(){//回合开始调用
        SF_INFO.turnBegain();
        GM_MAP.turnBegain();

        this._mainGameLayer.getMyPointsLayer().playShow();
        this._mainGameLayer.getOpPointsLayer().playHide();
        this._mainGameLayer.endRoundBtn.setVisible(true);
    },

    turnEnd:function(){//回合结束调用
        SF_INFO.turnEnd();
        OP_INFO.turnBegain();
        GM_MAP.turnEnd();
        this._mainGameLayer.getMyPointsLayer().playHide();
        this._mainGameLayer.getOpPointsLayer().playShow();
        this._mainGameLayer.endRoundBtn.setVisible(false);
    },


    receiveEndRound:function()
    {
        this.turnEnd();
    },

    receiveStartRound:function()
    {
        this.turnBegain();
    },

    receiveMove:function(event)
    {
        var data = event.getUserData();



        var role = GM_MAP._map.getChildByTag(data.tag);
        var roleTeamIndex = role._teamIndex;


        if(roleTeamIndex == TEAMTYPE.ALLIANCE){
            this._mainGameLayer._alliancePointsLayer.losePoints(data.movePoints.length);
        }else{
            this._mainGameLayer._tribePointsLayer.losePoints(data.movePoints.length);
        }

        if(roleTeamIndex == SF_INFO.teamIndex){
            SF_INFO.power -= data.movePoints.length;
        }else{
            OP_INFO.power -= data.movePoints.length;
        }


        role.move(data.movePoints);

        //button._controlButton._role.move(button.getTag());
        //button._controlButton._role = null;

    },

    receiveAttack:function(event)
    {
        var data = event.getUserData();
        var attackTag = data.attackTag;
        var damage = data.damage;
        var attackedTag = data.attackedTag;

        GM_MAP._map.getChildByTag(attackTag).attack(attackedTag,damage);
    },

    receiveExitMsg:function(event)
    {
        var data = event.getUserData();
    }

});

var GameScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});