/**
 * Created by john on 16/1/4.
 */
var ChooseCardLayer = BaseLayer.extend({
    cardNum : 0,
    isLeft : false,
    ctor:function(){
        this._super();
        this.loadCCB("ChooseCampLayer",res_gaming.chooseCard);
        cc.eventManager.addCustomListener(Response.msgId_chooseCard,this.receiveChooseCard.bind(this));

    },

    completedAnimationSequenceNamed:function(animationName){
        if(animationName == "leftUp" || animationName == "rightUp")
        {
            this.getParent().initData();
            this.removeFromParent();
        }
    },

    chooseCamp:function(sender)
    {
        this.ChooseMenu.setVisible(false);
        var fanpai1 = new cc.orbitCamera(0.5,1,0,0,90,0,0);
        var fanpai2 = new cc.orbitCamera(0.5,1,0,0,90,0,0);

        var fanpai3 = new cc.orbitCamera(0.5,1,0,270,90,0,0);
        var fanpai4 = new cc.orbitCamera(0.5,1,0,270,90,0,0);
        var drawCardAnimation1 = new cc.sequence(new cc.delayTime(0.5),new cc.show(),fanpai3);
        var drawCardAnimation2 = new cc.sequence(new cc.delayTime(0.5),new cc.show(),fanpai4);

        var chooseCardMsg = new ChooseCard();
        if(sender.getTag() == 1)
        {
            this.card1MenuItem.setVisible(false);

            //this.receiveChooseCard(true,false);
            chooseCardMsg.content.left = true;
            //this.card1.runAction(fanpai1);
            //this.cardAlliance.runAction(drawCardAnimation1);
        }
        else
        {
            this.card2MenuItem.setVisible(false);

            chooseCardMsg.content.left = false;
            //this.card2.runAction(fanpai2);
            //this.cardTribe.runAction(drawCardAnimation2);
        }
        global_network.sendMessage(chooseCardMsg);

    },


    receiveChooseCard:function(event){
        //receiveChooseCard:function(isLeft,isMyself){
        var data = event.getUserData();
        var isLeft = data.left;
        var isMyself = data.myself;
        var fanpai1 = new cc.orbitCamera(0.5,1,0,0,90,0,0);
        var fanpai2 = new cc.orbitCamera(0.5,1,0,270,90,0,0);
        var drawCardAnimation = new cc.sequence(new cc.delayTime(0.5),new cc.show(),fanpai2);

        if(isLeft)
        {
            this.cardNum++;
            this.card1MenuItem.setVisible(false);
            if(isMyself)
            {
                this.isLeft = true;
                if(SF_INFO.teamIndex == TEAMTYPE.ALLIANCE)
                {
                    this.card1.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("card_alliance.png"));
                }
                else
                {
                    this.card1.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("card_tribe.png"));
                }
            }
            else
            {
                if(OP_INFO.teamIndex == TEAMTYPE.ALLIANCE)
                {
                    this.card1.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("card_alliance.png"));
                }
                else
                {
                    this.card1.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("card_tribe.png"));
                }
            }
            this.cardBack1.runAction(fanpai1);
            this.card1.runAction(drawCardAnimation);
        }
        else
        {
            this.cardNum++;
            this.card2MenuItem.setVisible(false);
            if(isMyself)
            {
                this.isLeft = false;
                if(SF_INFO.teamIndex == TEAMTYPE.ALLIANCE)
                {
                    this.card2.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("card_alliance.png"));
                }
                else
                {
                    this.card2.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("card_tribe.png"));
                }
            }
            else
            {
                if(OP_INFO.teamIndex == TEAMTYPE.ALLIANCE)
                {
                    this.card2.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("card_alliance.png"));
                }
                else
                {
                    this.card2.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("card_tribe.png"));
                }
            }
            this.cardBack2.runAction(fanpai1);
            this.card2.runAction(drawCardAnimation);
        }

        if(this.cardNum == 2)
        {
           this.scheduleOnce(this.playAnimation,1);
        }
    },

    playAnimation:function()
    {
        if(this.isLeft)
        {
            this.rootNode.animationManager.runAnimationsForSequenceNamed("leftUp");
        }
        else
        {
            this.rootNode.animationManager.runAnimationsForSequenceNamed("rightUp");
        }

    }
});