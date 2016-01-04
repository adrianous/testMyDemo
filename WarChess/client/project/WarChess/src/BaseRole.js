/**
 * Created by yangyanfei on 16/1/1.
 */

var BaseRole = cc.Layer.extend({
    _sprite:null,//显示的ccbi
    _position:null,//当前所在位置
    _hp:0,//血量
    _attackDamage:0,// 物理攻击
    _magicDamage:0,// 魔法攻击
    _attackDefense:0,//物理防御
    _magicDefense:0,//魔法防御
    _damageFloat:0,//伤害浮动比率
    _critical:0,//暴击率
    _dodge:0,//闪躲率
    _angryPower:0,//怒气值
    _speed:0,//速度
    _moveType:0,//移动类型
    _moveRange:0,//移动距离
    _attackType:0,//攻击类型
    _minAttackRange:0,//最小攻击距离
    _macAttackRange:0,//最大攻击距离

    ctor:function(){
        this._super();
    },
    showMoveMenu:function(){//显示能走的位置menu

    },
    hideMoveMenu:function(){//隐藏能走的位置的menu

    },
    showAttackMenu:function(){//显示攻击范围的menu

    },
    hideAttackMenu:function(){//隐藏攻击范围的munu

    },
    caculateMovePath:function(toPos){
        return [];
    },
    move:function(toPos){//行走

    }

});