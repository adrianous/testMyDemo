/**
 * Created by john on 16/1/4.
 */


    //技能1:缴械 :战士;
    //技能2:冲锋 :战士;
    //技能3:标记 :猎人;
    //技能4:陷阱 :猎人;
    //技能5:潜行 :盗贼;
    //技能6:偷袭 :盗贼;  只有潜行状态才可以使用
    //技能7:毒击 :盗贼;
    //技能8:快速治疗:牧师;
    //技能9:治疗值环:牧师;
    //技能10:寒冰箭:法师;
    //技能11:暴风雪:法师;
    //技能12:火球术:法师;
    //技能13:烈焰风暴:法师;
    //技能14:圣光术:圣骑士;
    //技能15:圣疗术:圣骑士;

var BattleSkill = function(){
    this._icon = null;
    this._cost = 2;
    this._CD = 4;
    this._releaseCD = 0;
    this._releaseRange = 3;
    this._attackRange = 3;
    this._name = null;
    this._enAble = true;
};

var GetBattleSkillByTag = function(tag)
{
    var skill = new BattleSkill();
    skill._icon = "skills/skill"+tag+"/icon.png";
    switch(tag)
    {
        case 0 :
            skill = null;
            break;
        case 1 :
            skill._name = "缴械";
            skill._releaseRange = 3;
            break;
        case 2 :
            skill._name = "冲锋";
            break;
        case 3 :
            skill._name = "标记";
            break;
        case 4 :
            skill._name = "陷阱";
            break;
        case 5 :
            skill._name = "潜行";
            break;
        case 6 :
            skill._name = "偷袭";
            break;
        case 7 :
            skill._name = "毒击";
            break;
        case 8 :
            skill._name = "快速治疗";
            break;
        case 9 :
            skill._name = "治疗之环";
            break;
        case 10 :
            skill._name = "寒冰箭";
            break;
        case 11 :
            skill._name = "暴风雪";
            break;
        case 12 :
            skill._name = "火球术";
            break;
        case 13 :
            skill._name = "烈焰风暴";
            break;
        case 14 :
            skill._name = "圣光术";
            break;
        case 15 :
            skill._name = "圣疗术";
            break;
        default:
            skill._name = "";
            break;
    }

    return skill;
};