
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

        var mt = new cc.Sprite(res_gaming.mt);
        mt.setAnchorPoint(cc.p(0.5,0.35));
        mt.setFlippedX(true);
        mt.setPosition(cc.p(40,360));
        this._map.addChild(mt);

        this.initAllTileCenterPoint();
        this.initControlButton();
    },
    initAllTileCenterPoint:function(){
        this._allTileCenterPoint = [];
        this._tileSize = this._map.getTileSize();
        this._mapSize = this._map.getMapSize();

        for(var i = 0;i < this._mapSize.width;i++){
            for(var j = 0;j < this._mapSize.height;j++){
                var pos = cc.p(this._tileSize.width * (i+0.5),this._tileSize.height*(j+0.5));
                this._allTileCenterPoint.push(pos);
                cc.log("pos.x = " + pos.x + "       pos.y = " + pos.y);
            }
        }
    },
    initControlButton:function(){//根据地图添加移动按钮
        var buttons = [];
        for(var i = 0;i < this._allTileCenterPoint.length;i++){
            var button = new ControlButton(this.controlButtonCallBack,this._allTileCenterPoint[i],i);
            buttons.push(button);
        }

        this._menu = new cc.Menu(buttons);
        this._menu.setPosition(cc.p(0,0));
        this._map.addChild(this._menu);

    },
    initRoles:function(){

    },
    controlButtonCallBack:function(sender){
        cc.log("sender.tag == " + sender.getTag());
        sender.showMoveMark();
    }
});