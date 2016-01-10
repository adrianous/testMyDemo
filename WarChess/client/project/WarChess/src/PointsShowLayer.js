/**
 * Created by john on 16/1/6.
 */
var PointsShowLayer = BaseLayer.extend({
    isSelf : null,
    ctor:function(teamIndex)
    {
        this._super();
        var tmp = null;
        if(teamIndex == TEAMTYPE.ALLIANCE)
        {
            tmp = res_gaming.PointsLayerAlliance;
        }
        else
        {
            tmp = res_gaming.PointsLayerTribe;
        }
        this.loadCCB("PointsShowLayer",tmp);


        this.isSelf = (SF_INFO.teamIndex == teamIndex);



    },
    onEnter:function()
    {
        this._super();
        for (var i = 0 ; i < 10 ; i++)
        {
            var point = new PointShow();
            this.moveLayer.addChild(point);
            point.setPosition(cc.pAdd(this.orgNode,cc.p(0,31*i)));
            point.setTag(i);
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

    playShow:function()
    {
        var num = 10;
        if(this.isSelf)
        {
            num = SF_INFO.power;
        }
        else
        {
            num = OP_INFO.power;
        }
        this.moveLayer.removeAllChildren();
        for (var i = 0 ; i < num ; i++)
        {
            var point = new PointShow();
            this.moveLayer.addChild(point);
            point.setPosition(cc.pAdd(this.orgNode,cc.p(0,31*i)));
            point.setTag(i);
        }
        //this.losePoints(2);
        this.rootNode.animationManager.runAnimationsForSequenceNamed("show");
    },

    playHide:function()
    {
        this.rootNode.animationManager.runAnimationsForSequenceNamed("hide");
    },

    losePoints:function(_num)
    {
        var num = _num;
        var maxMum = 10;
        cc.log(this.isSelf+"sdfsdfsdf");
        if(this.isSelf)
        {
            maxMum = SF_INFO.power;
        }
        else
        {
            maxMum = OP_INFO.power;
        }
        while (num >0 && maxMum>0)
        {
            maxMum --;
            num--;
            this.moveLayer.getChildByTag(maxMum).playHide();
        }
        //SF_INFO.power -= _num;
    }
});