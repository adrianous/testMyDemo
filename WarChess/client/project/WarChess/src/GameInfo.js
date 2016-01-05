/**
 * Created by yangyanfei on 16/1/1.
 */

var GM_INFO = {
    mapIndex:1
};

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

var STATETYPE = {
    AWAIT:1,
    MOVED:2,
    SLEEP:3
};

var BUTTONTYPE = {
    AWAIT:1,
    CANMOVE:2,
    CANATTACK:3
};



var SF_INFO = {
    userId:"",
    iconUrl:"",
    nickname:"瓦塔西瓦",
    teamIndex:TEAMTYPE.ALLIANCE,//1:联盟
    teamLayout:null,
    power:10,
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
            var layout2 = new LayoutInfo(ROLETYPE.LUOYAN,3);
            var layout3 = new LayoutInfo(ROLETYPE.DAXIAOJIE,5);
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
    power:10,
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
            var layout2 = new LayoutInfo(ROLETYPE.LUOYAN,3);
            var layout3 = new LayoutInfo(ROLETYPE.DAXIAOJIE,5);
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