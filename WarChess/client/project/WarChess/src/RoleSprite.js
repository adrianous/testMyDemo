/**
 * Created by yangyanfei on 16/1/5.
 */


var RoleSprite = BaseLayer.extend({
    ctor:function(ccbFilePath){
        this._super();
        this.loadCCB("RoleSprite",ccbFilePath);
    },
    playMoveAction:function(){

    },
    playHurtAction:function(){

    },
    playAwaitAction:function(){

    }
});