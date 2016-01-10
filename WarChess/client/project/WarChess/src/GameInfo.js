/**
 * Created by yangyanfei on 16/1/1.
 */



var ROLETYPE = {
    MT:1,
    DAIZEI: 2,
    MUSHI: 3,
    LIEREN: 4,
    FASI: 5,
    SOLDIER_TRIBE:6,

    ANYENAN: 7,
    LUOYAN:8,
    DAXIAOJIE: 9,
    AIZILIEREN: 10,
    FANGZHUAN: 11,
    SOLDIER_ALLIANCE: 12
};

var TEAMTYPE = {
    ALLIANCE:1,//联盟
    TRIBE:2//部落
};

var ROLESTATE = {
    SLEEP:0,
    AWAIT:1,
    MOVED:2,
    ATTACKED:3,
    RELEASING:4,
    CANBEATTACKED:5
};

var BUTTONSTATE = {
    DISABLE:0,
    AWAIT:1,
    CANMOVE:2,
    CANATTACK:3
};

var GAMETYPE = {
    FREE:1,
    BUSY:2
};

var GM_INFO = {
    mapIndex:1,
    state:GAMETYPE.FREE
};


var SF_INFO = {
    userId:"",
    iconUrl:"",
    nickname:"瓦塔西瓦",
    teamIndex:TEAMTYPE.ALLIANCE,//1:联盟
    teamLayout:null,
    power:10,
    isMyTurn:false,
    turnBegain:function(){
        this.power = 10;
        this.isMyTurn = true;

    },
    turnEnd:function(){
        this.isMyTurn = false;

    },
    initLayout:function(){

        if(this.teamIndex == TEAMTYPE.TRIBE){
            var layout1 = new LayoutInfo(ROLETYPE.MT,43);
            var layout2 = new LayoutInfo(ROLETYPE.DAIZEI,41);
            var layout3 = new LayoutInfo(ROLETYPE.MUSHI,39);
            var layout4 = new LayoutInfo(ROLETYPE.LIEREN,37);
            var layout5 = new LayoutInfo(ROLETYPE.FASI,35);

            var layout6 = new LayoutInfo(ROLETYPE.SOLDIER_TRIBE,33);
            var layout7 = new LayoutInfo(ROLETYPE.SOLDIER_TRIBE,31);

            this.teamLayout = [];
            this.teamLayout.push(layout1);
            this.teamLayout.push(layout2);
            this.teamLayout.push(layout3);
            this.teamLayout.push(layout4);
            this.teamLayout.push(layout5);
            this.teamLayout.push(layout6);
            this.teamLayout.push(layout7);
        }else{
            var layout1 = new LayoutInfo(ROLETYPE.ANYENAN,1);
            var layout2 = new LayoutInfo(ROLETYPE.DAXIAOJIE,3);
            var layout3 = new LayoutInfo(ROLETYPE.LUOYAN,5);
            var layout4 = new LayoutInfo(ROLETYPE.AIZILIEREN,7);
            var layout5 = new LayoutInfo(ROLETYPE.FANGZHUAN,9);

            var layout6 = new LayoutInfo(ROLETYPE.SOLDIER_ALLIANCE,11);
            var layout7 = new LayoutInfo(ROLETYPE.SOLDIER_ALLIANCE,13);

            this.teamLayout = [];
            this.teamLayout.push(layout1);
            this.teamLayout.push(layout2);
            this.teamLayout.push(layout3);
            this.teamLayout.push(layout4);
            this.teamLayout.push(layout5);
            this.teamLayout.push(layout6);
            this.teamLayout.push(layout7);
        }


    }
};


var OP_INFO = {
    userId:"",
    iconUrl:"",
    nickname:"瓦塔西瓦",
    teamIndex:TEAMTYPE.TRIBE,//1:部落
    teamLayout:null,
    isMyTurn:false,
    power:10,

    turnBegain:function(){
        this.power = 10;
        this.isMyTurn = true;

    },
    turnEnd:function(){
        this.isMyTurn = false;

    },
    initLayout:function(){
        if(this.teamIndex == TEAMTYPE.TRIBE){
            var layout1 = new LayoutInfo(ROLETYPE.MT,43);
            var layout2 = new LayoutInfo(ROLETYPE.DAIZEI,41);
            var layout3 = new LayoutInfo(ROLETYPE.MUSHI,39);
            var layout4 = new LayoutInfo(ROLETYPE.LIEREN,37);
            var layout5 = new LayoutInfo(ROLETYPE.FASI,35);

            var layout6 = new LayoutInfo(ROLETYPE.SOLDIER_TRIBE,33);
            var layout7 = new LayoutInfo(ROLETYPE.SOLDIER_TRIBE,31);

            this.teamLayout = [];
            this.teamLayout.push(layout1);
            this.teamLayout.push(layout2);
            this.teamLayout.push(layout3);
            this.teamLayout.push(layout4);
            this.teamLayout.push(layout5);
            this.teamLayout.push(layout6);
            this.teamLayout.push(layout7);
        }else{
            var layout1 = new LayoutInfo(ROLETYPE.ANYENAN,1);
            var layout2 = new LayoutInfo(ROLETYPE.DAXIAOJIE,3);
            var layout3 = new LayoutInfo(ROLETYPE.LUOYAN,5);
            var layout4 = new LayoutInfo(ROLETYPE.AIZILIEREN,7);
            var layout5 = new LayoutInfo(ROLETYPE.FANGZHUAN,9);

            var layout6 = new LayoutInfo(ROLETYPE.SOLDIER_ALLIANCE,11);
            var layout7 = new LayoutInfo(ROLETYPE.SOLDIER_ALLIANCE,13);

            this.teamLayout = [];
            this.teamLayout.push(layout1);
            this.teamLayout.push(layout2);
            this.teamLayout.push(layout3);
            this.teamLayout.push(layout4);
            this.teamLayout.push(layout5);
            this.teamLayout.push(layout6);
            this.teamLayout.push(layout7);
        }
    }
};



function LayoutInfo(roleType,tag)
{
    this.roleType = roleType;
    this.tag = tag;
}

var GAME_TOOLS = {
    getHead:function(sp)
    {
        var radius = 48;
        //if(isResult)radius = 48;
        sp.setScaleX(radius*2/sp.getContentSize().width);
        sp.setScaleY(radius*2/sp.getContentSize().height);
        var testStencil = cc.DrawNode.create();
        var nCount = 200;
        var circleArray = [];
        var angel = 2.0 * Math.PI/nCount;
        for(var i = 0 ; i< 200 ; i++)
        {
            var radian = i * angel;
            circleArray.push(cc.p(radius * Math.cos(radian),radius * Math.sin(radian)))
        }
        testStencil.drawPoly(circleArray,nCount,cc.RED,0,cc.RED);
        var clipper = new cc.ClippingNode(testStencil);

        clipper.addChild(sp);
        return clipper;
    }
};
