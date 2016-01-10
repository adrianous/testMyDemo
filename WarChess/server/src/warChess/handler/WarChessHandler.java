package warChess.handler;

import game.PlayerState;
import warChess.protocol.request.ChooseCardRequest;
import warChess.protocol.request.EndRoundRequest;
import warChess.protocol.request.MoveRequest;
import warChess.protocol.request.GiveupRequest;
import warChess.protocol.request.ReFightRequest;
import warChess.protocol.request.RetractEnsureRequest;
import warChess.protocol.request.AttackRequest;
import warChess.protocol.response.ChooseCardResponse;
import warChess.protocol.response.EndRoundResponse;
import warChess.protocol.response.GiveupResponse;
import warChess.protocol.response.OpReadyResponse;
import warChess.protocol.response.ReFightResponse;
import warChess.protocol.response.ResultResponse;
import warChess.protocol.response.MoveResponse;
import warChess.protocol.response.AttackResponse;
import warChess.protocol.response.StartRoundResponse;
import gs.core.basic.RoomManager;
import gs.core.handler.AbstractLogicHandler;
import gs.core.protocol.BasicRequest;
import gs.core.protocol.PlayerData;

import org.apache.mina.core.session.IoSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import warChess.WarChessRoom;

/**
 * �����虫父���
 * 
 * @author &#x738B;&#x52C7;
 * @version 1.0
 * @since 1.0
 */
public class WarChessHandler extends AbstractLogicHandler {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(WarChessHandler.class);

	@Override
	public void handleRequest(BasicRequest request, IoSession session) {
		// TODO Auto-generated method stub

		final String roomId = (String) session.getAttribute("roomId");
		final String userId = (String) session.getAttribute("userId");
		
		WarChessRoom room = (WarChessRoom) RoomManager.getRoom(roomId);// 拿到当前的room
																			// 可以发送广播
		String currUserId = userId;
		String anotherUserId = room.getAnotherId(currUserId);

		if (currUserId == null || anotherUserId == null)
			return;

		PlayerState currPlayer = room.getPlayerState(currUserId);
		PlayerState anotherPlayer = room.getPlayerState(anotherUserId);

		LOGGER.debug("currUserId ====== " + currUserId);
		LOGGER.debug("anotherUserId ====== " + anotherUserId);

		 if (request instanceof ReFightRequest) {
			// ReFightResponse refight_resp = new ReFightResponse();
			// room.sendMessage(anotherUserId, refight_resp);
			currPlayer.isReady = true;
			if (anotherPlayer != null && anotherPlayer.isReady) {
				room.isInGame = true;
				currPlayer.resetData();
				anotherPlayer.resetData();
				room.addTimer(61000, room.cutDownId);
				ReFightResponse refight_resp= new ReFightResponse();
				room.broadcast(refight_resp);
			}
			else
			{
				room.sendMessage(anotherUserId, new OpReadyResponse());
			}
			
		} else if (request instanceof ChooseCardRequest) {
			
			boolean isLeft = ((ChooseCardRequest)request).isLeft();
			boolean isLeglle = true;
			if(isLeft)
			{
				if(anotherPlayer.chooseCard == 1)
				{
					isLeglle = false;
				}
				else
				{
					currPlayer.chooseCard = 1;
				}
			}
			else
			{
				if(anotherPlayer.chooseCard == 2)
				{
					isLeglle = false;
				}
				else
				{
					currPlayer.chooseCard = 2;
				}
			}
			
			if(isLeglle)
			{
				
				ChooseCardResponse chooseCardResponseCurr = new ChooseCardResponse(isLeft,true);
				ChooseCardResponse chooseCardResponseOp = new ChooseCardResponse(isLeft,false);
				
				room.sendMessage(currUserId, chooseCardResponseCurr);
				room.sendMessage(anotherUserId, chooseCardResponseOp);
			}
//			if(currPlayer.chooseCard != 0 && currPlayer.chooseCard != 0)
//			{
//				StartRoundResponse startRound = new StartRoundResponse();
//				room.broadcast(startRound);
//			}
			room.addRoundTimer();
		} else if (request instanceof MoveRequest) {
			if(currPlayer.isMyTurn())
			{
				MoveRequest moveRequest = (MoveRequest)request;
				MoveResponse moveResponse = new MoveResponse(moveRequest.getTag(),moveRequest.getMovePoints());
				room.broadcast(moveResponse);
			
			}
		} 
		
		else if (request instanceof AttackRequest) {
			
			if(currPlayer.isMyTurn())
			{
				AttackRequest attackRequest = (AttackRequest)request;
				AttackResponse attackResponse = new AttackResponse(attackRequest.getAttackTag(),attackRequest.getDamage(),attackRequest.getAttackedTag());
				room.broadcast(attackResponse);
			}
		} 
		 
		else if (request instanceof EndRoundRequest) {
			
			if(currPlayer.isMyTurn())
			{
				currPlayer.setMyTurn(false);
				anotherPlayer.setMyTurn(true);
				
				EndRoundResponse endRoundRes = new EndRoundResponse();
				room.sendMessage(currUserId, endRoundRes);
				
				
				StartRoundResponse startRoundRes = new StartRoundResponse();
				room.sendMessage(anotherUserId, startRoundRes);
				
				room.stopRoundTimer();
				room.addRoundTimer();
			}
		} 
	}

}