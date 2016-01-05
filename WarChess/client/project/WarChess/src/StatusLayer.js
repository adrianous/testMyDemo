/**
 * Created by john on 16/1/5.
 */
var StatusLayer = BaseLayer.extend({

    ctor:function()
    {
        this._super();
        this.loadCCB("StatusLayer",res_gaming.statusBarLayer);
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