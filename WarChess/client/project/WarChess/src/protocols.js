/**
 * Created by yangyanfei on 15/5/27.
 */

var RequestMsgId = {
    msgId_none : 0,

    msgId_enter:12,
    msgId_chooseCard : 101,
    msgId_joker : 102,
    msgId_refight : 103,
    msgId_endRound : 104,
    msgId_move : 105,
    msgId_attack : 106,
    msgId_giveup : 107,
    msgId_RetractEnsure: 108,
    msgId_drawEnsure : 109,

    msgId_test:4

};

var Response = {
    msgId_playersInfo : 12,
    msgId_start : 205,
    msgId_chooseCard : 206,
    msgId_joker : 207,
    msgId_result : 208,
    msgId_refight : 209,
    msgId_oneExit : 210,
    msgId_startRound : 211,
    msgId_move :212,
    msgId_endRound : 213,
    msgId_attack : 214,
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
        left : null
    }
};

//表情
var JokerMsg = function(){
    this.msgId=RequestMsgId.msgId_emoji;
    this.content={
        index : 0
    }
};

var RefightMsg = function(){
    this.msgId = RequestMsgId.msgId_refight;
    this.content = {

    }
};

var AttackMsg = function()
{
    this.msgId = RequestMsgId.msgId_attack;
    this.content = {
        attackTag:0,
        damage:0,
        attackedTag:0
    }
};

var MoveMsg = function()
{
    this.msgId = RequestMsgId.msgId_move;
    this.content = {
        tag:null,
        movePoints:null
    }
};

var EndRoundMsg = function()
{
    this.msgId = RequestMsgId.msgId_endRound;
    this.content = {

    }
};

var GiveupMsg = function()
{
    this.msgId = RequestMsgId.msgId_giveup;
    this.content = {

    }
};

var DrawEnsureMsg = function()
{
    this.msgId = RequestMsgId.msgId_drawEnsure;
    this.content = {

        isSure : null
    }
};

var RetractEnsureMsg = function()
{
    this.msgId = RequestMsgId.msgId_RetractEnsure;
    this.content = {

    }
};
