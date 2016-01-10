/**
 * Created by john on 16/1/6.
 */
var PointShow = BaseLayer.extend({

    ctor:function()
    {
        this._super();
        this.loadCCB("PointShow",res_gaming.Point);
    },

    completedAnimationSequenceNamed:function(animationName)
    {
        //if(animationName == "leftUp" || animationName == "rightUp")
        //{
        //    this.getParent().initData();
        //    this.removeFromParent();
        //}
    },
    playShow : function()
    {
        this.rootNode.animationManager.runAnimationsForSequenceNamed("appear");
    },

    playHide :function()
    {
        this.rootNode.animationManager.runAnimationsForSequenceNamed("disappear");
    }
});