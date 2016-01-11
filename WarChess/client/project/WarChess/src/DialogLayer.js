/**
 * Created by jonh on 16/1/11.
 */


var DialogLayer = BaseLayer.extend({
    ctor:function(){
        this._super();
        this.loadCCB("DialogLayer",res_gaming.dialogLayer);
    },
    completedAnimationSequenceNamed:function(animationName){
        //cc.log(animationName + "动画播放完毕");
        //if(animationName == "show"){
        //    this.removeFromParent(true);
        //}
    },
    playRefight:function()
    {
        this.rootNode.animationManager.runAnimationsForSequenceNamed("refight");

    },
    playLeave:function()
    {
        this.rootNode.animationManager.runAnimationsForSequenceNamed("leave");

    }

});
