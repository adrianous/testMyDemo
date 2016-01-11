/**
 * Created by john on 16/1/5.
 */
var StatusLayer = BaseLayer.extend({
    currRole:null,
    showStatus:null,
    ctor:function()
    {
        this.showStatus = false;
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
    },

    showRoleStatus:function()
    {
        var isShow = false;
        var role = GM_MAP._selectedRole;

        if(role != null)
        {
            isShow = true;

            this.name.setString(role._name);
            this.attackDamage.setString(role._attackDamage);
            this.magicDamage.setString(role._magicDamage);
            this.attackDefense.setString(role._attackDefense);
            this.magicDefense.setString(role._magicDefense);
            this.currHp.setString(role._hp);
            this.headImage.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(role._headSprite));

            if(role._skill1 != null)
            {
                this.skill1Image.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(role._skill1._icon));
                this.skill1Image.setVisible(true);
            }
            else{
                this.skill1Image.setVisible(false);
                this.skillBtn1.setEnabled(false);
            }

            if(role._skill2 != null)
            {
                this.skill2Image.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(role._skill2._icon));
                this.skill2Image.setVisible(true);
            }
            else{
                this.skillBtn2.setEnabled(false);
                this.skill2Image.setVisible(false);
            }


            //this.skillBtn1.setEnabled(false);
            //this.skillBtn2.setEnabled(false);
            //this.BlackMask.setVisible(true);

            //this.moveBtn.setEnabled(role._isCanMove);
            //this.attackBtn.setEnabled(role._isCanAttack);
            this.skillBtn1.setEnabled(role._isCanSkill1);
            this.skillBtn2.setEnabled(role._isCanSkill2);

            if(role._isCanMove || role._isCanAttack || role._isCanSkill1 || role._isCanSkill2){
                this.BlackMask.setVisible(false);
            }else{
                this.BlackMask.setVisible(true);
            }




            //switch (role._state)
            //{
            //   case ROLESTATE.SLEEP:
            //   {
            //       this.skillBtn1.setEnabled(false);
            //       this.skillBtn2.setEnabled(false);
            //       this.BlackMask.setVisible(true);
            //   }
            //       break;
            //    case ROLESTATE.MOVED:
            //    case ROLESTATE.AWAIT:
            //    {
            //        this.BlackMask.setVisible(false);
            //
            //    }
            //        break;
            //}

        }
        else
        {
            isShow = false;
        }

        this.show(isShow);

    },

    show:function(isShow)
    {
        if(isShow)
        {
            if(!this.showStatus)
            {
                this.showStatus = true;
                this.rootNode.animationManager.runAnimationsForSequenceNamed("moveUp");
            }
        }
        else
        {
            if(this.showStatus)
            {
                this.showStatus = false;
                this.rootNode.animationManager.runAnimationsForSequenceNamed("moveDown");
            }
        }
    },
    //移动按钮点击事件
    moveSelector:function(){
        GM_MAP._selectedRole.showMoveButton();
    },
    //攻击按钮点击事件
    attackSelector:function(){
        GM_MAP._selectedRole.showAttackRole();
    },


    skillSelector:function(sender)
    {

    }
});