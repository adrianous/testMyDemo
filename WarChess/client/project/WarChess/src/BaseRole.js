/**
 * Created by yangyanfei on 16/1/1.
 */

var BaseRole = cc.Layer.extend({
    _sprite:null,//显示的ccbi
    _hp:0,//血量
    _teamIndex:0,
    _state:STATETYPE.AWAIT,

    _attackDamage:0,// 物理攻击
    _magicDamage:0,// 魔法攻击
    _attackDefense:0,//物理防御
    _magicDefense:0,//魔法防御
    _damageFloat:0,//伤害浮动比率
    _critical:0,//暴击率
    _dodge:0,//闪躲率
    _angryPower:0,//怒气值

    _moveType:0,//移动类型
    _moveRange:0,//移动距离
    _attackType:0,//攻击类型
    _minAttackRange:0,//最小攻击距离
    _macAttackRange:0,//最大攻击距离

    ctor:function(roleType,teamIndex){
        this._super();

        var data = null;
        switch (roleType){
            case ROLETYPE.MT:
            {
                data = MTBaseData;
                this._sprite = new RoleSprite(res_gaming.role_mt);
                this.addChild(this._sprite);
                break;
            }
            case ROLETYPE.DAIZEI:
            {
                data = RobberBaseData;
                this._sprite = new RoleSprite(res_gaming.role_daizei);
                this.addChild(this._sprite);
                break;
            }
            case ROLETYPE.MUSHI:
            {
                data = TreatBaseData;
                this._sprite = new RoleSprite(res_gaming.role_mushi);
                this.addChild(this._sprite);
                break;
            }
            case ROLETYPE.LIEREN:
            {
                data = HunterBaseData;
                this._sprite = new RoleSprite(res_gaming.role_lieren);
                this.addChild(this._sprite);
                break;
            }

            case ROLETYPE.FASI:
            {
                data = MagicBaseData;
                this._sprite = new RoleSprite(res_gaming.role_fasi);
                this.addChild(this._sprite);
                break;
            }
            case ROLETYPE.SOLDIER_TRIBE:
            {
                data = SoldierBaseData;
                this._sprite = new RoleSprite(res_gaming.role_soldier_tribe);
                this.addChild(this._sprite);
                break;
            }
            case ROLETYPE.ANYENAN:
            {
                data = MTBaseData;
                this._sprite = new RoleSprite(res_gaming.role_anyenan);
                this.addChild(this._sprite);
                break;
            }
            case ROLETYPE.LUOYAN:
            {
                data = RobberBaseData;
                this._sprite = new RoleSprite(res_gaming.role_luoyan);
                this.addChild(this._sprite);
                break;
            }
            case ROLETYPE.DAXIAOJIE:
            {
                data = TreatBaseData;
                this._sprite = new RoleSprite(res_gaming.role_daxiaojie);
                this.addChild(this._sprite);
                break;
            }
            case ROLETYPE.AIZILIEREN:
            {
                data = HunterBaseData;
                this._sprite = new RoleSprite(res_gaming.role_aizilieren);
                this.addChild(this._sprite);
                break;
            }
            case ROLETYPE.FANGZHUAN:
            {
                data = MagicBaseData;
                this._sprite = new RoleSprite(res_gaming.role_fangzhuan);
                this.addChild(this._sprite);
                break;
            }
            case ROLETYPE.SOLDIER_ALLIANCE:
            {
                data = SoldierBaseData;
                this._sprite = new RoleSprite(res_gaming.role_soldier_alliance);
                this.addChild(this._sprite);
                break;
            }

        }

        this._teamIndex = teamIndex;
        this._attackDamage = data._attackDamage;
        this._magicDamage = data._magicDamage;
        this._attackDefense = data._attackDefense;
        this._magicDamage = data._magicDefense;
        this._damageFloat = data._damageFloat;
        this._critical = data._critical;
        this._dodge = data._dodge;
        this._angryPower = data._angryPower;
        this._moveType = data._moveType;
        this._moveRange = data._moveRange;
        this._attackType = data._attackType;
        this._minAttackRange = data._minAttackRange;
        this._macAttackRange = data._macAttackRange;

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