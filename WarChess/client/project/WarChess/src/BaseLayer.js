/**
 * Created by yangyanfei on 15/6/26.
 */


var BaseLayer = cc.Layer.extend({
    loadCCB:function(ccbFileName,ccbFilePath){
        cc.BuilderReader.registerController(ccbFileName,this);
        cc.BuilderReader.setResourcePath("res/");
        var node = cc.BuilderReader.load(ccbFilePath, this);
        this.addChild(node);
    },
    completedAnimationSequenceNamed:function(animationName){
        //cc.log(animationName + "动画播放完毕");
    },
    onDidLoadFromCCB:function(ccbFileName){
        //cc.log(ccbFileName + "加载完毕");
    }
});