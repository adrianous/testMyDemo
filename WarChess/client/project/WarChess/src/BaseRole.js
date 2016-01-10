/**
 * Created by yangyanfei on 16/1/1.
 */

var BaseRole = BaseLayer.extend({
    _sprite:null,//显示的ccbi
    _name:null,//名字
    _hp:0,//血量

    _maxHp:0,//最大血量
    _teamIndex:0,// 阵营
    _state:ROLESTATE.SLEEP,  // 人物状态
    _isHiding:false,
    _isSelf:false,
    _moveToButton:null,
    _moveToTag:0,
    _attackTag:0,
    _damage:0,
    _isCanMove:false,
    _isCanAttack:false,
    _isCanSkill1:false,
    _isCanSkill2:false,
    _movePathArray:null,
    _attackRoleArray:null,


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

    _headSprite:null,//头像图片
    _skill1 :null, // 技能1
    _skill2 :null, // 技能2

    ctor:function(roleType,teamIndex,tag){
        this._super();

        var roleTag = null;
        var data = null;
        var skill1Tag = 1;
        var skill2Tag = 2;
        var ccbPath = null;
        switch (roleType){
            case ROLETYPE.MT:
            {
                this._name = "哀木涕";
                data = MTBaseData;
                roleTag = "mt";
                skill1Tag = 1;
                skill2Tag = 2;
                ccbPath = res_gaming.role_mt;
                //ccbPath = res_gaming.role_soldier_tribe;
                break;
            }
            case ROLETYPE.DAIZEI:
            {
                this._name = "呆贼";
                data = RobberBaseData;
                roleTag = "daizei";
                skill1Tag = 5;
                skill2Tag = 7;
                ccbPath = res_gaming.role_daizei;
                //ccbPath = res_gaming.role_soldier_tribe;
                break;
            }
            case ROLETYPE.MUSHI:
            {
                this._name = "木尸";
                data = TreatBaseData;
                roleTag = "mushi";
                skill1Tag = 8;
                skill2Tag = 9;
                ccbPath = res_gaming.role_mushi;
                //ccbPath = res_gaming.role_soldier_tribe;
                break;
            }
            case ROLETYPE.LIEREN:
            {
                this._name = "劣人";
                data = HunterBaseData;
                roleTag = "lieren";
                skill1Tag = 3;
                skill2Tag = 4;
                ccbPath = res_gaming.role_lieren;
                //ccbPath = res_gaming.role_soldier_tribe;
                break;
            }

            case ROLETYPE.FASI:
            {
                this._name = "发丝";
                data = MagicBaseData;
                roleTag = "fasi";
                skill1Tag = 12;
                skill2Tag = 13;
                ccbPath = res_gaming.role_fasi;
                //ccbPath = res_gaming.role_soldier_tribe;
                break;

            }
            case ROLETYPE.SOLDIER_TRIBE:
            {
                this._name = "部落勇士";
                data = SoldierBaseData;
                roleTag = "soldier_tribe";
                skill1Tag = 0;
                skill2Tag = 0;
                ccbPath = res_gaming.role_soldier_tribe;
                //ccbPath = res_gaming.role_soldier_tribe;
                break;
            }
            case ROLETYPE.ANYENAN:
            {
                this._name = "暗夜男人";
                data = MTBaseData;
                roleTag = "anyenan";
                skill1Tag = 1;
                skill2Tag = 2;
                ccbPath = res_gaming.role_anyenan;
                //ccbPath = res_gaming.role_soldier_tribe;
                break;
            }
            case ROLETYPE.LUOYAN:
            {
                this._name = "落雁";
                data = RobberBaseData;
                roleTag = "luoyan";
                skill1Tag = 5;
                skill2Tag = 7;
                ccbPath = res_gaming.role_luoyan;
                //ccbPath = res_gaming.role_soldier_tribe;
                break;
            }
            case ROLETYPE.DAXIAOJIE:
            {
                this._name = "大小姐";
                data = TreatBaseData;
                roleTag = "daxiaojie";
                skill1Tag = 14;
                skill2Tag = 15;
                ccbPath = res_gaming.role_daxiaojie;
                //ccbPath = res_gaming.role_soldier_tribe;
                break;
            }
            case ROLETYPE.AIZILIEREN:
            {
                this._name = "矮子猎人";
                data = HunterBaseData;
                roleTag = "aizilieren";
                skill1Tag = 3;
                skill2Tag = 4;
                ccbPath = res_gaming.role_aizilieren;
                //ccbPath = res_gaming.role_soldier_tribe;
                break;
            }
            case ROLETYPE.FANGZHUAN:
            {
                this._name = "方砖";
                data = MagicBaseData;
                roleTag = "fangzhuan";
                skill1Tag = 10;
                skill2Tag = 11;
                ccbPath = res_gaming.role_fangzhuan;
                //ccbPath = res_gaming.role_soldier_tribe;
                break;
            }
            case ROLETYPE.SOLDIER_ALLIANCE:
            {
                this._name = "联盟勇士";
                data = SoldierBaseData;
                roleTag = "soldier_alliance";
                skill1Tag = 0;
                skill2Tag = 0;
                ccbPath = res_gaming.role_soldier_alliance;
                //ccbPath = res_gaming.role_soldier_tribe;
                break;
            }
        }

        this.loadCCB("RoleSprite",ccbPath);
        this.sprite.setPositionY(-15);
        this._headSprite = "role/"+roleTag+"/head.png";
        this._teamIndex = teamIndex;
        if(teamIndex == SF_INFO.teamIndex){
            this._isSelf = true;
        }
        this._hp = data._hp;
        this._maxHp = data._hp;
        this._attackDamage = data._attackDamage;
        this._magicDamage = data._magicDamage;
        this._attackDefense = data._attackDefense;
        this._magicDefense = data._magicDefense;
        this._damageFloat = data._damageFloat;
        this._critical = data._critical;
        this._dodge = data._dodge;
        this._angryPower = data._angryPower;
        this._moveType = data._moveType;
        this._moveRange = data._moveRange;
        this._attackType = data._attackType;
        this._minAttackRange = data._minAttackRange;
        this._macAttackRange = data._macAttackRange;
        this._skill1 = GetBattleSkillByTag(skill1Tag);
        this._skill2 = GetBattleSkillByTag(skill2Tag);


        this.setPosition(GM_MAP.getPositionByTag(tag));
        this.setTag(tag);
        this.setLocalZOrder(GM_MAP.getZOrderByTag(this.getTag()));
    },


    onButtonPress:function(){


        cc.log("sdfasdf");
        //先判断是不是自己的
        if(GM_MAP._selectedRole == this)return;

        GM_MAP.resetButtons();
        if(this._isSelf){


            if(GM_MAP._selectedRole != null){
                GM_MAP._selectedRole.resetSfRoles();
                this.resetOpRoles();
            }

            GM_MAP._selectedRole = this;

            //计算行走的路线
            this.caculateMovePath();

            //计算普通攻击人物
            this.caculateAttackRole();

            GM_LAYER._statusLayer.showRoleStatus();
        }else{
            if(this._state == ROLESTATE.CANBEATTACKED){
                //发送打人的消息


                var attackMsg = new AttackMsg();
                attackMsg.content.attackTag = GM_MAP._selectedRole.getTag();
                attackMsg.content.damage = 4321;
                attackMsg.content.attackedTag = this.getTag();

                global_network.sendMessage(attackMsg);

                if(GM_MAP._selectedRole != null){
                    GM_MAP._selectedRole.resetSfRoles();
                    this.resetOpRoles();
                }
            }else{

                if(GM_MAP._selectedRole != null){
                    GM_MAP._selectedRole.resetSfRoles();
                    this.resetOpRoles();
                }

                GM_MAP._selectedRole = this;
                GM_LAYER._statusLayer.showRoleStatus();
            }
        }



        switch (this._state){
            case ROLESTATE.SLEEP :
            {
                break;
            }
        }
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


    caculateMovePath:function(){
        if(this._state == ROLESTATE.SLEEP)return;
        if(this._state == ROLESTATE.MOVED){
            this._isCanMove = false;
        }else{
            if(this._moveType = 1){
                GM_MAP.caculateMoveTypeOne();
            }else if(this._moveType == 2){
                GM_MAP.caculateMoveTypeTwo();
            }

            if(this._movePathArray != null){
                this._isCanMove = true;
                for(var i in this._movePathArray){
                    GM_MAP._buttons[i].showMoveMark();
                }
            }
        }
    },
    caculateAttackRole:function(){
        if(this._state == ROLESTATE.SLEEP)return;
        if(this._state == ROLESTATE.ATTACKED){
            this._isCanAttack = false;
        }else{
            if(this._attackType == 1){
                GM_MAP.caculateAttakTypeOne();
            }else if(this._attackType == 2){
                GM_MAP.caculateAttakTypeTwo();
            }

            if(this._attackRoleArray != null){
                this._isCanAttack = true;
                for(var i in this._attackRoleArray){
                    GM_MAP._map.getChildByTag(this._attackRoleArray[i]).sprite.setColor(cc.color(255,0,0,255));
                }
            }

        }



    },


    showMoveButton:function(){//显示能走的位置Button

        if(this._movePathArray == null)return;
        for(var i in this._movePathArray){
            GM_MAP._buttons[i].showMoveMark();
        }
    },
    showAttackRole:function(){//显示攻击范围的Button
        if(this._attackRoleArray == null)return;
        for(var i in this._attackRoleArray){
            GM_MAP._map.getChildByTag(this._attackRoleArray[i]).sprite.setColor(cc.color(255,0,0,255));
        }
    },


    resetSfRoles:function(){

        this._isCanMove = false;
        this._isCanAttack = false;
        this._movePathArray = null;
        this._attackRoleArray = null;

    },
    resetOpRoles:function(){
        for(var i in GM_MAP._opRoles){
            var role = GM_MAP._opRoles[i];
            role._state = ROLESTATE.SLEEP;
            role.sprite.setColor(cc.color(255,255,255,255));
        }
    },

    move:function(movePath){//行走


        this._moveToTag = movePath[movePath.length - 1];//找到自己要移动到的点
        this.setLocalZOrder(GM_MAP.getMaxZOrder());//移动前设置层级为最高

        var actions = [];
        for(var i in movePath){
            var action = new cc.MoveTo(0.8,GM_MAP.getPositionByTag(movePath[i]));
            actions.push(action);
        }
        var callBack = new cc.callFunc(this.moveCallback.bind(this));
        actions.push(callBack);
        var sequence = new cc.Sequence(actions);
        this.runAction(sequence);

        this.playMoveAction();
    },
    attack:function(attackTag,damage){
        this._attackTag = attackTag;
        this._damage = damage;
        this.playAttackAction();
    },
    hurt:function(damage){
        this.playHurtAction();


        var damageShow = new DamageShowLayer();
        damageShow.showDamage(damage);

        this.addChild(damageShow);

        this._hp -= damage;

        if(this._hp <= 0){
            this.playDeadAction();
        }

    },


    moveCallback:function(){
        this.playAwaitAction();

        this.setTag(this._moveToTag);
        this.setLocalZOrder(GM_MAP.getZOrderByTag(this.getTag()));
        this._moveToTag = 0;
        this._isCanMove = false;

        if(this._isSelf){
            this._state = ROLESTATE.MOVED;

            this.caculateAttackRole();
            GM_LAYER._statusLayer.showRoleStatus();
        }
    },
    attackCallback:function(){

        if(this._isSelf){
            this._state = ROLESTATE.SLEEP;
        }


        var attackRole = GM_MAP._map.getChildByTag(this._attackTag);
        attackRole.hurt(this._damage);
    }




});