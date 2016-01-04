/**
 * Created by yangyanfei on 15/5/27.
 */

var RequestMsgId = {
    msgId_none : 0,

    msgId_enter:12,
    msgId_chooseCard : 101,
    msgId_emoji : 102,
    msgId_refight : 103,
    msgId_endRound : 104,
    msgId_retract : 105,
    msgId_draw : 106,
    msgId_giveup : 107,
    msgId_RetractEnsure: 108,
    msgId_drawEnsure : 109,

    msgId_test:4

};

var Response = {
    msgId_playersInfo : 12,
    msgId_start : 205,
    msgId_chooseCard : 206,
    msgId_emoji : 207,
    msgId_result : 208,
    msgId_refight : 209,
    msgId_oneExit : 210,
    msgId_startRound : 211,
    msgId_retract :212,
    msgId_draw : 213,
    msgId_drawEnsure : 214,
    msgId_giveup : 215,
    msgId_retractEnsure : 216,
    msgId_opReady : 217,

    msgId_test:4
};

//准备
var EnterMsg = function(){
    this.msgId=RequestMsgId.msgId_enter;
    this.content={
        userId : global_userId,
        gameId : global_gameId,
        roomId : global_roomId,
        sessionKey : global_sessionKey
    }
};

//出拳
var ChooseCard = function(){
    this.msgId=RequestMsgId.msgId_chooseCard;
    this.content={
        userId : global_userId,
        gameId : global_gameId,
        roomId : global_roomId,
        sessionKey : global_sessionKey,
        isLeft : null
    }
};

//表情
var EmojiMsg = function(){
    this.msgId=RequestMsgId.msgId_emoji;
    this.content={
        userId : global_userId,
        gameId : global_gameId,
        roomId : global_roomId,
        sessionKey : global_sessionKey,
        index : 0
    }
};

var RefightMsg = function(){
    this.msgId = RequestMsgId.msgId_refight;
    this.content = {
        userId : global_userId,
        gameId : global_gameId,
        roomId : global_roomId,
        sessionKey : global_sessionKey
    }
};




var DrawMsg = function()
{
    this.msgId = RequestMsgId.msgId_draw;
    this.content = {
        userId : global_userId,
        gameId : global_gameId,
        roomId : global_roomId,
        sessionKey : global_sessionKey
    }
};


var TestMsg = function()
{
    this.msgId = RequestMsgId.msgId_test;
    this.content = {
        userId : global_userId,
        gameId : global_gameId,
        roomId : global_roomId,
        sessionKey : global_sessionKey,
        count:0
    }
};

var RetractMsg = function()
{
    this.msgId = RequestMsgId.msgId_retract;
    this.content = {
        userId : global_userId,
        gameId : global_gameId,
        roomId : global_roomId,
        sessionKey : global_sessionKey
    }
};
var GiveupMsg = function()
{
    this.msgId = RequestMsgId.msgId_giveup;
    this.content = {
        userId : global_userId,
        gameId : global_gameId,
        roomId : global_roomId,
        sessionKey : global_sessionKey
    }
};

var DrawEnsureMsg = function()
{
    this.msgId = RequestMsgId.msgId_drawEnsure;
    this.content = {
        userId : global_userId,
        gameId : global_gameId,
        roomId : global_roomId,
        sessionKey : global_sessionKey,
        isSure : null
    }
};

var RetractEnsureMsg = function()
{
    this.msgId = RequestMsgId.msgId_RetractEnsure;
    this.content = {
        userId : global_userId,
        gameId : global_gameId,
        roomId : global_roomId,
        sessionKey : global_sessionKey
    }
};
