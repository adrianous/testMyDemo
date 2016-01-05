/**
 * Created by yangyanfei on 16/1/1.
 */

var GameLayer = BaseLayer.extend({
    _mapLayer : null,
    _mainGameLayer : null,
    ctor:function(){
        this._super();




        //cc.spriteFrameCache.addSpriteFrames(res_gaming.warChessPlist);
        //var testChooseCardLayer = new ChooseCardLayer();
        //this.addChild(testChooseCardLayer);

        var statusLayer = new StatusLayer();
        this._mainGameLayer = new MainGameLayer();

        this.addChild(this._mainGameLayer);
        this._mainGameLayer.addChild(statusLayer);

        SF_INFO.initLayout();
        OP_INFO.initLayout();

        this.initMap();
    },
    initMap:function(){
        this._mapLayer = new MapLayer();
        this._mainGameLayer.addChild(this._mapLayer);
    },
    initData:function(){
        this._mapLayer.initData();
    }

});

var GameScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});