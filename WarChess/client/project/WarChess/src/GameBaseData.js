/**
 * Created by john on 16/1/4.
 */
var MTBaseData = {
    _hp:700,//血量
    _attackDamage:120,//攻击
    _magicDamage:0,//法术攻击力
    _attackDefense:30,//物理防御力
    _magicDefense:22,//法术防御力
    _damageFloat:0.1,//攻击浮动比率
    _critical:0.03,//暴击率
    _dodge:0.01,//闪躲率
    _angryPower:0.05,//怒气值修订
    _moveType:1,//移动类型
    _moveRange:1,//移动距离
    _attackType:1,//攻击类型
    _minAttackRange:1,//最小攻击距离
    _macAttackRange:1//最大攻击距离
};

//盗贼
var RobberBaseData = {
    _hp:MTBaseData._hp*0.75,//血量
    _attackDamage:MTBaseData._attackDamage*0.9,//攻击
    _magicDamage:0,//法术攻击力
    _attackDefense:MTBaseData._attackDefense*0.75,//物理防御力
    _magicDefense:MTBaseData._magicDefense*0.35,//法术防御力
    _damageFloat:0.15,//攻击浮动比率
    _critical:0.08,//暴击率
    _dodge:0.02,//闪躲率
    _angryPower:0.05,//怒气值修订

    _moveType:1,//移动类型
    _moveRange:2,//移动距离
    _attackType:2,//攻击类型
    _minAttackRange:1,//最小攻击距离
    _macAttackRange:1//最大攻击距离
};

//牧师
var TreatBaseData = {
    _hp:MTBaseData._hp*0.70,//血量
    _attackDamage:MTBaseData._attackDamage*0.35,//攻击
    _magicDamage:MTBaseData._magicDamage*0.6,//法术攻击力
    _attackDefense:MTBaseData._attackDefense*0.50,//物理防御力
    _magicDefense:MTBaseData._magicDefense*0.90,//法术防御力
    _damageFloat:0.15,//攻击浮动比率
    _critical:0.1,//暴击率
    _dodge:0.05,//闪躲率
    _angryPower:0.05,//怒气值修订

    _moveType:1,//移动类型
    _moveRange:1,//移动距离
    _attackType:1,//攻击类型
    _minAttackRange:1,//最小攻击距离
    _macAttackRange:2//最大攻击距离
};

//猎人
var HunterBaseData = {
    _hp:MTBaseData._hp*0.9,//血量
    _attackDamage:MTBaseData._attackDamage*0.95,//攻击
    _magicDamage:MTBaseData._magicDamage*0.3,//法术攻击力
    _attackDefense:MTBaseData._attackDefense*0.9,//物理防御力
    _magicDefense:MTBaseData._magicDefense*0.45,//法术防御力
    _damageFloat:0.10,//攻击浮动比率
    _critical:0.04,//暴击率
    _dodge:0.03,//闪躲率
    _angryPower:0.05,//怒气值修订

    _moveType:2,//移动类型
    _moveRange:3,//移动距离
    _attackType:3,//攻击类型
    _minAttackRange:2,//最小攻击距离
    _macAttackRange:3//最大攻击距离
};

//法师
var MagicBaseData = {
    _hp:MTBaseData._hp*0.6,//血量
    _attackDamage:MTBaseData._attackDamage*0.45,//攻击
    _magicDamage:200,//法术攻击力
    _attackDefense:MTBaseData._attackDefense*0.3,//物理防御力
    _magicDefense:120,//法术防御力
    _damageFloat:0.15,//攻击浮动比率
    _critical:0.02,//暴击率
    _dodge:0.07,//闪躲率
    _angryPower:0.05,//怒气值修订

    _moveType:2,//移动类型
    _moveRange:2,//移动距离
    _attackType:1,//攻击类型
    _minAttackRange:1,//最小攻击距离
    _macAttackRange:2//最大攻击距离
};

//小兵
var SoldierBaseData = {
    _hp:MTBaseData._hp*0.30,//血量
    _attackDamage:MTBaseData._attackDamage*0.65,//攻击
    _magicDamage:0,//法术攻击力
    _attackDefense:MTBaseData._attackDefense*0.35,//物理防御力
    _magicDefense:MTBaseData._magicDefense*0.05,//法术防御力
    _damageFloat:0.10,//攻击浮动比率
    _critical:0.01,//暴击率
    _dodge:0.01,//闪躲率
    _angryPower:0.05,//怒气值修订

    _moveType:1,//移动类型
    _moveRange:2,//移动距离
    _attackType:1,//攻击类型
    _minAttackRange:1,//最小攻击距离
    _macAttackRange:1//最大攻击距离
};



