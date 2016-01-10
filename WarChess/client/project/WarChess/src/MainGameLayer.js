/**
 * Created by john on 16/1/5.
 */
var MainGameLayer = BaseLayer.extend({
    _alliancePointsLayer:null,
    _tribePointsLayer:null,

    ctor:function()
    {
        this._super();
        this.loadCCB("MainGameLayer",res_gaming.mainGameLayer);
        this._alliancePointsLayer = new PointsShowLayer(1);
        this._tribePointsLayer = new PointsShowLayer(2);
        this.addChild(this._alliancePointsLayer);
        this.addChild(this._tribePointsLayer);
    },

    initPointsLayer : function()
    {
        this._alliancePointsLayer.playShow();
    },

    getMyPointsLayer:function()
    {
        if(SF_INFO.teamIndex ==TEAMTYPE.ALLIANCE )
        {
            return this._alliancePointsLayer;
        }
        else{
            return this._tribePointsLayer;
        }
    },
    getOpPointsLayer:function()
    {
        if(OP_INFO.teamIndex ==TEAMTYPE.ALLIANCE )
        {
            return this._alliancePointsLayer;
        }
        else{
            return this._tribePointsLayer;
        }
    },
    completedAnimationSequenceNamed:function(animationName)
    {
        //if(animationName == "leftUp" || animationName == "rightUp")
        //{
        //    this.getParent().initData();
        //    this.removeFromParent();
        //}
    },

    EndRoundSelector:function()
    {
        var endRoundMsg = new EndRoundMsg();
        global_network.sendMessage(endRoundMsg);
    }

});