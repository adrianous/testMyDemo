
var MapLayer = BaseLayer.extend({
    _map:null,
    _menu:null,
    _allTileCenterPoint:null,
    _tileSize:null,
    _mapSize:null,
    ctor:function(){
        this._super();
        var mapName = "map_" + GM_INFO.mapIndex;
        this._map = new cc.TMXTiledMap(res_gaming[mapName]);
        this._map.setPosition(cc.p(cc.winSize.width*0.5,cc.winSize.height*0.5));
        this._map.setAnchorPoint(cc.p(0.5,0.4));
        this.addChild(this._map);

        this.initData();
    },


    initData:function(){
        this.initAllTileCenterPoint();
        this.initControlButton();
        this.initRoles();
    },

    initAllTileCenterPoint:function(){
        this._allTileCenterPoint = [];
        this._tileSize = this._map.getTileSize();
        this._mapSize = this._map.getMapSize();

        for(var i = 0;i < this._mapSize.width;i++){
            for(var j = 0;j < this._mapSize.height;j++){
                var pos = cc.p(this._tileSize.width * (i+0.5),this._tileSize.height*(j+0.5));
                this._allTileCenterPoint.push(pos);
            }
        }
    },
    initControlButton:function(){//根据地图添加移动按钮
        var buttons = [];
        for(var i = 0;i < this._allTileCenterPoint.length;i++){
            var button = new ControlButton(this.controlButtonCallBack.bind(this),this._allTileCenterPoint[i],i);
            buttons.push(button);
        }

        this._menu = new cc.Menu(buttons);
        this._menu.setPosition(cc.p(0,0));
        this._map.addChild(this._menu);

    },
    initRoles:function(){

        //自己的阵容
        for(var i in SF_INFO.teamLayout){
            //新建个人物调用工厂方法 现在先自己建立

            var tag = SF_INFO.teamLayout[i].tag;
            var mt = new BaseRole(SF_INFO.teamLayout[i].roleType,SF_INFO.teamIndex);
            mt.setPosition(this._allTileCenterPoint[tag]);
            this._map.addChild(mt);
            this._menu.getChildByTag(tag)._role = mt;

        }


        //敌方的阵容
        for(var i in OP_INFO.teamLayout){
            //新建个人物调用工厂方法 现在先自己建立

            var tag = OP_INFO.teamLayout[i].tag;
            var mt = new BaseRole(OP_INFO.teamLayout[i].roleType,OP_INFO.teamIndex);
            mt.setPosition(this._allTileCenterPoint[tag]);
            this._map.addChild(mt);
            this._menu.getChildByTag(tag)._role = mt;
        }
    },
    controlButtonCallBack:function(controlButton){
        //cc.log("sender.tag == " + controlButton.getTag());


        var role = controlButton._role;
        var tag = controlButton.getTag();
        this.changeButtonToNormalMark();
        if(role != null){
            if(role._state == STATETYPE.AWAIT){
                this.changeButtonToMoveMark(tag,role);
                this.changeButtonToAttackMark(tag,role);
            }else if(role._state == STATETYPE.MOVED){
                this.changeButtonToAttackMark(tag,role);
            }else{
                this.changeButtonToNormalMark();
            }
        }else{
            this.changeButtonToNormalMark();
        }

    },

    getMapPositionByTag:function(tag){
        return {x:parseInt(tag/this._mapSize.height),y:tag % this._mapSize.height};

    },

    getTagAtPosition:function(pos){
        return pos.x * this._mapSize.height + pos.y;
    },

    caculateMoveTypeOne:function(currTag,role){
        var curr_mapPos = this.getMapPositionByTag(currTag);
        for(var i = 1;i< role._moveRange + 1;i++){
            var up_pos = {x:curr_mapPos.x,y:curr_mapPos.y + i};
            var dw_pos = {x:curr_mapPos.x,y:curr_mapPos.y - i};
            var lf_pos = {x:curr_mapPos.x - i,y:curr_mapPos.y};
            var rt_pos = {x:curr_mapPos.x + i,y:curr_mapPos.y};

            if(up_pos.y < this._mapSize.height){
                var item_up = this._menu.getChildByTag(this.getTagAtPosition(up_pos));
                if(item_up._role == null){
                    item_up.showMoveMark();
                }
            }

            if(dw_pos.y > -1){
                var item_dw = this._menu.getChildByTag(this.getTagAtPosition(dw_pos));
                if(!item_dw._role){
                    item_dw.showMoveMark();
                }
            }

            if(lf_pos.x > -1){
                var item_lf = this._menu.getChildByTag(this.getTagAtPosition(lf_pos));
                if(!item_lf._role){
                    item_lf.showMoveMark();
                }
            }

            if(rt_pos.x < this._mapSize.width){
                var item_rt = this._menu.getChildByTag(this.getTagAtPosition(rt_pos));
                if(!item_rt._role){
                    item_rt.showMoveMark();
                }
            }
        }
    },
    caculateMoveTypeTwo:function(currTag,role){
        var curr_mapPos = this.getMapPositionByTag(currTag);
        for(var i = 1;i< role._moveRange + 1;i++){

            for(var j = 1;j< role._moveRange + 1;j++){

            }
            var lf_up_pos = {x:curr_mapPos.x - i,y:curr_mapPos.y + i};
            var lf_dw_pos = {x:curr_mapPos.x - i,y:curr_mapPos.y - i};
            var rt_up_pos = {x:curr_mapPos.x + i,y:curr_mapPos.y + i};
            var rt_dw_pos = {x:curr_mapPos.x + i,y:curr_mapPos.y - i};

            if(lf_up_pos.y < this._mapSize.height && lf_up_pos.x > -1 ){
                var item_up = this._menu.getChildByTag(this.getTagAtPosition(lf_up_pos));
                if(item_up._role == null){
                    item_up.showMoveMark();
                }
            }

            if(lf_dw_pos.y > -1 && lf_dw_pos.x > -1){
                var item_dw = this._menu.getChildByTag(this.getTagAtPosition(lf_dw_pos));
                if(!item_dw._role){
                    item_dw.showMoveMark();
                }
            }

            if(rt_up_pos.x < this._mapSize.width && rt_up_pos.y < this._mapSize.height){
                var item_lf = this._menu.getChildByTag(this.getTagAtPosition(rt_up_pos));
                if(!item_lf._role){
                    item_lf.showMoveMark();
                }
            }

            if(rt_dw_pos.x < this._mapSize.width && rt_dw_pos.y > -1){
                var item_rt = this._menu.getChildByTag(this.getTagAtPosition(rt_dw_pos));
                if(!item_rt._role){
                    item_rt.showMoveMark();
                }
            }
        }
    },
    changeButtonToMoveMark:function(currTag,role){
        if(role._moveType == 1){
            this.caculateMoveTypeOne(currTag,role);
        }else if(role._moveType == 2){
            this.caculateMoveTypeOne(currTag,role);
            this.caculateMoveTypeTwo(currTag,role);
        }
    },
    changeButtonToAttackMark:function(currTag,moveType,moveRange){

    },
    changeButtonToNormalMark:function(){
        var buttons = this._menu.getChildren();
        for(var i in buttons){
            buttons[i].showNormalMark();
        }
    }
});