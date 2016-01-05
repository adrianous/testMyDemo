/**
 * Created by john on 16/1/5.
 */
var MainGameLayer = BaseLayer.extend({

    ctor:function()
    {
        this._super();
        this.loadCCB("MainGameLayer",res_gaming.mainGameLayer);
    },

    completedAnimationSequenceNamed:function(animationName)
    {
        //if(animationName == "leftUp" || animationName == "rightUp")
        //{
        //    this.getParent().initData();
        //    this.removeFromParent();
        //}
    }
});