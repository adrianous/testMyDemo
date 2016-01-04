package warChess;


import gs.GameServer;
import gs.core.basic.GameConfig;
import gs.core.basic.RoomManager;
import gs.core.basic.ServerConfig;
import gs.core.protocol.PlayerData;
import gs.core.protocol.ProtocolMapper;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Main {
	private static final Logger LOGGER = LoggerFactory.getLogger(Main.class);
	public static void main(String[] args) {
		try {
			ProtocolMapper.init("warChess.protocol.request");
			GameServer.startServer();
			if(!ServerConfig.isReleaseVersion())
			{
				final List<PlayerData> players = new ArrayList<PlayerData>();
				PlayerData player1 = new PlayerData("userId1","杨延飞","http://7xjxba.com1.z0.glb.clouddn.com/14358229262529?e=1751182930&token=bz2giEcTM9os8itpIhHdGYMjBQHeaS1dkxEqLWu4:BbZGTXWyJ4GyCetpt28UbymZ384=");
				PlayerData player2 = new PlayerData("userId2","wuxiao","http://7xjxba.com1.z0.glb.clouddn.com/14358229262529?e=1751182930&token=bz2giEcTM9os8itpIhHdGYMjBQHeaS1dkxEqLWu4:BbZGTXWyJ4GyCetpt28UbymZ384=");
				players.add(player1);
				players.add(player2);
				RoomManager.buildRoom(GameConfig.getGameId(), players);
			}
	
		} catch (Exception e) {
			LOGGER.error("Start game server failed !", e);
			System.exit(-1);
		}
	}
}
