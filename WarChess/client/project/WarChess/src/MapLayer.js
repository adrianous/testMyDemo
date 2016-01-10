

var GM_MAP = null;

var MapLayer = BaseLayer.extend({
    _map:null,
    _menu:null,
    _allTileCenterPoint:null,
    _allTileCoordPoint:null,
    _tileSize:null,
    _mapSize:null,
    _buttons:null,
    _sfRoles:null,
    _opRoles:null,
    _allRoles:null,
    _selectedRole:null,
    ctor:function(){
        this._super();
        var mapName = "map_" + GM_INFO.mapIndex;
        this._map = new cc.TMXTiledMap(res_gaming[mapName]);
        this._map.setPosition(cc.p(cc.winSize.width*0.5,87));
        this._map.setAnchorPoint(cc.p(0.5,0));
        this.addChild(this._map);


    },

    onEnter:function(){
        this._super();
        GM_MAP = this;
        this.initData();
    },
    onExit:function(){
        this._super();
        GM_MAP = null;
    },


    initData:function(){
        this.initAllTileCenterPoint();
        this.initControlButton();
        this.initRoles();
    },

    initAllTileCenterPoint:function(){
        this._allTileCenterPoint = [];
        this._allTileCoordPoint = [];
        this._tileSize = this._map.getTileSize();
        this._mapSize = this._map.getMapSize();

        for(var i = 0;i < this._mapSize.width;i++){
            for(var j = 0;j < this._mapSize.height;j++){
                var pos = cc.p(this._tileSize.width * (i+0.5),this._tileSize.height*(j+0.5));
                this._allTileCenterPoint.push(pos);

                var pos1 = {x:i,y:j};
                this._allTileCoordPoint.push(pos1);
            }
        }
        cc.log("numeiasdfasf");
    },

    initControlButton:function(){//根据地图添加移动按钮
       this._buttons = [];
        for(var i = 0;i < this._allTileCenterPoint.length;i++){
            var button = new ControlButton(this.controlButtonCallBack.bind(this),i);
            this._buttons.push(button);
        }

        var menu = new cc.Menu(this._buttons);
        menu.setPosition(cc.p(0,0));
        this._map.addChild(menu);

    },
    initRoles:function(){

        this._sfRoles = [];
        this._opRoles = [];
        this._allRoles = [];
        //自己的阵容
        for(var i in SF_INFO.teamLayout){
            //新建个人物调用工厂方法 现在先自己建立

            var tag = SF_INFO.teamLayout[i].tag;
            var mt = new BaseRole(SF_INFO.teamLayout[i].roleType,SF_INFO.teamIndex,tag);
            this._map.addChild(mt);
            this._sfRoles.push(mt);
            this._allRoles.push(mt);

        }


        //敌方的阵容
        for(var j in OP_INFO.teamLayout){
            //新建个人物调用工厂方法 现在先自己建立

            var tag1 = OP_INFO.teamLayout[j].tag;
            var mt1 = new BaseRole(OP_INFO.teamLayout[j].roleType,OP_INFO.teamIndex,tag1);
            this._map.addChild(mt1);
            this._opRoles.push(mt1);
            this._allRoles.push(mt1);
        }
    },
    controlButtonCallBack:function(button){


        //调用显示人物信息的方法

        if(button._state == BUTTONSTATE.CANMOVE){


            //this._selectedRole.move(this._selectedRole._movePathArray[button.getTag()]);

            var moveMsg = new MoveMsg();
            moveMsg.content.tag = this._selectedRole.getTag();
            moveMsg.content.movePoints = this._selectedRole._movePathArray[button.getTag()];

            global_network.sendMessage(moveMsg);
        }else{
            if(this._selectedRole != null){
                this._selectedRole.resetSfRoles();
                this._selectedRole.resetOpRoles();
                this._selectedRole = null;
            }

            GM_LAYER._statusLayer.showRoleStatus();
            //this.resetButtons();
        }
        this.resetButtons();
    },

    getMapPositionByTag:function(tag){
        return {x:parseInt(tag/this._mapSize.height),y:tag % this._mapSize.height};

    },

    getMapTagAtPosition:function(pos){//pos(0,1)
        return pos.x * this._mapSize.height + pos.y;
    },
    getZOrderByTag:function(tag){
       return this._mapSize.height - tag % this._mapSize.height;
    },
    getPositionByTag:function(tag){
        return this._allTileCenterPoint[tag];
    },
    getMaxZOrder:function(){
        return this._mapSize.height + 1;
    },


    caculateMoveTypeOne:function(){

        var role = this._selectedRole;
        var curr_mapPos = this.getMapPositionByTag(role.getTag());
        var range = role._moveRange;
        if(SF_INFO.power < range)range = SF_INFO.power;

        role._movePathArray = {};
        for(var i = 1;i< range + 1;i++){
            var up_pos = {x:curr_mapPos.x,y:curr_mapPos.y + i};
            var dw_pos = {x:curr_mapPos.x,y:curr_mapPos.y - i};
            var lf_pos = {x:curr_mapPos.x - i,y:curr_mapPos.y};
            var rt_pos = {x:curr_mapPos.x + i,y:curr_mapPos.y};

            if(up_pos.y < this._mapSize.height){
                var moveToTag = this.getMapTagAtPosition(up_pos);
                var moveToRole = this._map.getChildByTag(moveToTag);
                if(moveToRole == null || (moveToRole != null && moveToRole._isHiding && role._teamIndex != moveToRole._teamIndex)){

                    var movePath = [];
                    for(var j =1 ; j <= i ; j++){
                        var tempPos = {x:curr_mapPos.x,y:curr_mapPos.y + j};
                        var tempTag = this.getMapTagAtPosition(tempPos);
                        var tempRole = this._map.getChildByTag(this.getMapTagAtPosition(tempPos));

                        if(tempRole == null || tempRole._teamIndex == role._teamIndex || (tempRole._teamIndex != role._teamIndex && tempRole._isHiding)){
                            movePath.push(tempTag);
                        }else{
                            movePath = null;
                            break;
                        }

                    }
                    if(movePath != null){
                        role._movePathArray[moveToTag] = movePath;
                    }
                }
            }

            if(dw_pos.y > -1){
                var moveToTag = this.getMapTagAtPosition(dw_pos);
                var moveToRole = this._map.getChildByTag(moveToTag);
                if(moveToRole == null || (moveToRole != null && moveToRole._isHiding && role._teamIndex != moveToRole._teamIndex)){

                    var movePath = [];
                    for(var j =1 ; j <= i ; j++){
                        var tempPos = {x:curr_mapPos.x,y:curr_mapPos.y - j};
                        var tempTag = this.getMapTagAtPosition(tempPos);
                        var tempRole = this._map.getChildByTag(this.getMapTagAtPosition(tempPos));

                        if(tempRole == null || tempRole._teamIndex == role._teamIndex || (tempRole._teamIndex != role._teamIndex && tempRole._isHiding)){
                            movePath.push(tempTag);
                        }else{
                            movePath = null;
                            break;
                        }

                    }
                    if(movePath != null){
                        role._movePathArray[moveToTag] = movePath;
                    }
                }
            }
            //
            if(lf_pos.x > -1){
                var moveToTag = this.getMapTagAtPosition(lf_pos);
                var moveToRole = this._map.getChildByTag(moveToTag);
                if(moveToRole == null || (moveToRole != null && moveToRole._isHiding && role._teamIndex != moveToRole._teamIndex)){

                    var movePath = [];
                    for(var j =1 ; j <= i ; j++){
                        var tempPos = {x:curr_mapPos.x - j,y:curr_mapPos.y};
                        var tempTag = this.getMapTagAtPosition(tempPos);
                        var tempRole = this._map.getChildByTag(this.getMapTagAtPosition(tempPos));

                        if(tempRole == null || tempRole._teamIndex == role._teamIndex || (tempRole._teamIndex != role._teamIndex && tempRole._isHiding)){
                            movePath.push(tempTag);
                        }else{
                            movePath = null;
                            break;
                        }

                    }
                    if(movePath != null){
                        role._movePathArray[moveToTag] = movePath;
                    }
                }

            }
            //
            if(rt_pos.x < this._mapSize.width){
                var moveToTag = this.getMapTagAtPosition(rt_pos);
                var moveToRole = this._map.getChildByTag(moveToTag);
                if(moveToRole == null || (moveToRole != null && moveToRole._isHiding && role._teamIndex != moveToRole._teamIndex)){

                    var movePath = [];
                    for(var j =1 ; j <= i ; j++){
                        var tempPos = {x:curr_mapPos.x + j,y:curr_mapPos.y};
                        var tempTag = this.getMapTagAtPosition(tempPos);
                        var tempRole = this._map.getChildByTag(this.getMapTagAtPosition(tempPos));

                        if(tempRole == null || tempRole._teamIndex == role._teamIndex || (tempRole._teamIndex != role._teamIndex && tempRole._isHiding)){
                            movePath.push(tempTag);
                        }else{
                            movePath = null;
                            break;
                        }

                    }
                    if(movePath != null){
                        role._movePathArray[moveToTag] = movePath;
                    }
                }
            }
        }

        if(Object.keys(role._movePathArray).length == 0){
            role._movePathArray = null;
        }

    },




    caculateMoveTypeTwo:function(){
        var role = this._selectedRole;
        var curr_mapPos = this.getMapPositionByTag(role.getTag());

        var range = role._moveRange;
        if(SF_INFO.power < range)range = SF_INFO.power;


        var dis1Points = [];
        var dis2Points = [];
        var dis3Points = [];
        var tempMoveArray1 = {};
        var tempMoveArray2 = {};
        var tempMoveArray3 = {};
        role._movePathArray = {};
        for(var i in this._allTileCoordPoint){

            var tempPos1 = this._allTileCoordPoint[i];

            var disX = Math.abs(tempPos1.x - curr_mapPos.x);
            var disY = Math.abs(tempPos1.y - curr_mapPos.y);
            var dis = disX + disY;
            if(dis == 1 && dis <= range){
                dis1Points.push(tempPos1);
            }else if(dis == 2 && dis <= range){
                dis2Points.push(tempPos1);
            }else if(dis == 3 && dis <= range){
                dis3Points.push(tempPos1);
            }
        }


        for (var i in dis1Points){

            var moveToTag = this.getMapTagAtPosition(dis1Points[i]);
            var tempRole = this._map.getChildByTag(moveToTag);
            var movePath = [];
            if(tempRole == null || tempRole._isSelf || (!tempRole._isSelf && tempRole._isHiding)){
                movePath.push(moveToTag);
                tempMoveArray1[moveToTag] = movePath;
            }

        }

        for (var i in dis2Points) {

            var moveToPos = dis2Points[i];
            var moveToTag = this.getMapTagAtPosition(moveToPos);
            var tempRole = this._map.getChildByTag(moveToTag);



            for (var j in tempMoveArray1) {

                var kPos = this.getMapPositionByTag(parseInt(j));

                var disXk = Math.abs(kPos.x - moveToPos.x);
                var disYk = Math.abs(kPos.y - moveToPos.y);
                var disk = disXk + disYk;
                if (disk == 1) {

                    if (tempRole == null || tempRole._isSelf || (!tempRole._isSelf && tempRole._isHiding)) {

                        var movePath = [];
                        for (var k in tempMoveArray1[j]) {
                            movePath.push(tempMoveArray1[j][k]);
                        }
                        movePath.push(moveToTag);
                        tempMoveArray2[moveToTag] = movePath;
                        break;
                    }

                }
            }
        }

        for (var i in dis3Points) {

            var moveToPos = dis3Points[i];
            var moveToTag = this.getMapTagAtPosition(moveToPos);
            var tempRole = this._map.getChildByTag(moveToTag);



            for (var j in tempMoveArray2) {

                var kPos = this.getMapPositionByTag(parseInt(j));

                var disXk = Math.abs(kPos.x - moveToPos.x);
                var disYk = Math.abs(kPos.y - moveToPos.y);
                var disk = disXk + disYk;
                if (disk == 1) {

                    if (tempRole == null || tempRole._isSelf || (!tempRole._isSelf && tempRole._isHiding)) {

                        var movePath = [];
                        for (var k in tempMoveArray2[j]) {
                            movePath.push(tempMoveArray2[j][k]);
                        }
                        movePath.push(moveToTag);
                        tempMoveArray3[moveToTag] = movePath;
                        break;
                    }

                }
            }
        }

        for(var i in tempMoveArray1){
            var tempRole = this._map.getChildByTag(parseInt(i));
            if(tempRole == null || !tempRole._isSelf){
                role._movePathArray[i] = tempMoveArray1[i];
            }
        }

        for(var i in tempMoveArray2){
            var tempRoless = this._map.getChildByTag(parseInt(i));
            if(tempRoless == null || !tempRoless._isSelf){
                role._movePathArray[i] = tempMoveArray2[i];
            }
        }

        for(var i in tempMoveArray3){
            var tempRole = this._map.getChildByTag(parseInt(i));
            if(tempRole == null || !tempRole._isSelf){
                role._movePathArray[i] = tempMoveArray3[i];
            }
        }


        if(Object.keys(role._movePathArray).length == 0){
            role._movePathArray = null;
        }

    },

    caculateAttakTypeOne:function(){
        var role = this._selectedRole;
        role._attackRoleArray = [];
        var curr_mapPos = this.getMapPositionByTag(role.getTag());
        var minRange = role._minAttackRange;
        var maxRange = role._macAttackRange;
        if(SF_INFO.power < maxRange)maxRange = SF_INFO.power;

        if(minRange <= maxRange){
            for (var i = minRange;i <= maxRange;i++){
                for (var j in this._opRoles){

                    var tempRole = this._opRoles[j];
                    var tempTag = tempRole.getTag();
                    var tempPos = this.getMapPositionByTag(tempTag);
                    var disX = Math.abs(tempPos.x - curr_mapPos.x);
                    var disY = Math.abs(tempPos.y - curr_mapPos.y);
                    var dis = disX + disY;
                    if(dis == i && (disX == 0 || disY == 0)){

                        if(!tempRole._isSelf && !tempRole._isHiding){
                            tempRole._state = ROLESTATE.CANBEATTACKED;
                            role._attackRoleArray.push(tempTag);
                        }
                    }

                }
            }
        }

        if(role._attackRoleArray.length == 0){
            role._attackRoleArray = null;
        }

    },

    caculateAttakTypeTwo:function(){
        var role = this._selectedRole;
        role._attackRoleArray = [];
        var curr_mapPos = this.getMapPositionByTag(role.getTag());
        var minRange = role._minAttackRange;
        var maxRange = role._macAttackRange;
        if(SF_INFO.power < maxRange)maxRange = SF_INFO.power;

        if(minRange <= maxRange){
            for (var i = minRange;i <= maxRange;i++){
                for (var j in this._opRoles){

                    var tempRole = this._opRoles[j];
                    var tempTag = tempRole.getTag();
                    var tempPos = this.getMapPositionByTag(tempTag);
                    var disX = Math.abs(tempPos.x - curr_mapPos.x);
                    var disY = Math.abs(tempPos.y - curr_mapPos.y);
                    var dis = disX + disY;
                    if(dis == i && (dis == 2 && disX != 0 && disY != 0)){

                        if(!tempRole._isSelf && !tempRole._isHiding){
                            tempRole._state = ROLESTATE.CANBEATTACKED;
                            role._attackRoleArray.push(tempTag);
                        }
                    }

                }
            }
        }

        if(role._attackRoleArray.length == 0){
            role._attackRoleArray = null;
        }
    },

    caculateAttackDamage:function(role){

    },

    caculateAttackDefence:function(role){

    },





    changeButtonToMoveMark:function(button){
        var role = button._role;
        if(role._moveType == 1){
            this.caculateMoveTypeOne(button);//十字型
        }else if(role._moveType == 2){
            this.caculateMoveTypeTwo(button);//根据范围平铺型
        }
    },
    changeButtonToAttackMark:function(button){
        var role = button._role;
        if(role._attackType == 1){
            this.caculateAttakTypeOne(button);//十字型
        }else if(role._attackType == 2){
            this.caculateAttakTypeTwo(button);//盗贼特殊类型
        }
    },
    changeButtonToNormalMark:function(){
        for(var i in this._buttons){
            this._buttons[i].reset();
        }
    },

    resetButtons:function(){
        for(var i in this._buttons){
            this._buttons[i].reset();
        }
    },

    turnBegain:function(){
        for(var i in this._sfRoles){
            this._sfRoles[i]._state = ROLESTATE.AWAIT;
        }
    },

    turnEnd:function(){
        for(var i in this._sfRoles){
            this._sfRoles[i]._state = ROLESTATE.SLEEP;
        }


        for(var j in GM_MAP._opRoles){
            var role = GM_MAP._opRoles[j];
            role._state = ROLESTATE.SLEEP;
            role.sprite.setColor(cc.color(255,255,255,255));
        }

        this.resetButtons();
    }

    //openButtonTouch:function(){
    //
    //    for(var i in this._buttons){
    //
    //        this._buttons[i].openTouch();
    //        if(this._buttons[i]._role){
    //            this._buttons[i]._role.openTouch();
    //        }
    //    }
    //},
    //closeButtonTouch:function(){
    //    for(var i in this._buttons){
    //        this._buttons[i].closeTouch();
    //    }
    //}
});