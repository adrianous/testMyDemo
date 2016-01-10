/**
 * Created by yangyanfei on 16/1/5.
 */

var RoleSprite = BaseLayer.extend({
    ctor:function(ccbFilePath){
        this._super();

        this.loadCCB("RoleSprite",res_gaming.role_soldier_tribe);
        //this.loadCCB("RoleSprite",ccbFilePath);
        this.setPositionY(-15)

    },
    playMoveAction:function(){
        this.rootNode.animationManager.runAnimationsForSequenceNamed("walk");
    },
    playHurtAction:function(){
        this.rootNode.animationManager.runAnimationsForSequenceNamed("hurt");
    },
    playAwaitAction:function(){
        this.rootNode.animationManager.runAnimationsForSequenceNamed("wait");
    },
    playDeadAction:function(){
        this.rootNode.animationManager.runAnimationsForSequenceNamed("dead");
    },
    playAttackAction:function(){
        this.rootNode.animationManager.runAnimationsForSequenceNamed("attack");
    },
    onButtonPress:function(){

    }

});