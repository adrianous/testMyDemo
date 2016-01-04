/**
 * Created by yangyanfei on 16/1/1.
 */

var GameLayer = BaseLayer.extend({
    _mapLayer : null,
    ctor:function(){
        this._super();
        this.initMap();

        var testChooseCardLayer = new ChooseCardLayer();
        this.addChild(testChooseCardLayer);



    },
    initMap:function(){
        this._mapLayer = new MapLayer();
        this.addChild(this._mapLayer);

    },
    initControlButton:function(){//根据地图添加移动和攻击按钮

    },
    showControlButton:function(role){//根据英雄(小兵)来显示移动和攻击按钮

    }

});

var GameScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});