package warChess.handler;

import game.PlayerState;
import warChess.protocol.request.DrawEnsureRequest;
import warChess.protocol.request.DrawRequest;
import warChess.protocol.request.GiveupRequest;
import warChess.protocol.request.ReFightRequest;
import warChess.protocol.request.RetractEnsureRequest;
import warChess.protocol.request.RetractRequest;
import warChess.protocol.response.DrawEnsureResponse;
import warChess.protocol.response.DrawResponse;
import warChess.protocol.response.GiveupResponse;
import warChess.protocol.response.OpReadyResponse;
import warChess.protocol.response.ReFightResponse;
import warChess.protocol.response.ResultResponse;
import warChess.protocol.response.RetractEnsureResponse;
import warChess.protocol.response.RetractResponse;
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

		WarChessRoom room = (WarChessRoom) RoomManager.getRoom(request.getRoomId());// 拿到当前的room
																			// 可以发送广播
		String currUserId = request.getUserId();
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
		} else if (request instanceof DrawRequest) {
			room.drawUsrId = currUserId;
			room.addTimer(10500, room.drawId);
			room.sendMessage(anotherUserId, new DrawResponse());
		} else if (request instanceof RetractRequest) {
			room.retractUsrId = currUserId;
			room.addTimer(10500, room.retractId);
			room.sendMessage(anotherUserId, new RetractResponse());
		} 
	}

}