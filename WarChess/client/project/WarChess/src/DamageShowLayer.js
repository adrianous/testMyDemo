/**
 * Created by yangyanfei on 16/1/9.
 */


var DamageShowLayer = BaseLayer.extend({
    ctor:function(){
        this._super();
        this.loadCCB("DamageShow",res_gaming.damageShow);
    },
    completedAnimationSequenceNamed:function(animationName){
        //cc.log(animationName + "动画播放完毕");
        if(animationName == "show"){
            this.removeFromParent(true);
        }
    },
    showDamage:function(damage){
        this.label.setString(damage);
    }
});
