package gs.core;

import warChess.WarChessRoom;
import gs.core.basic.IRoomFactory;
import gs.core.basic.Room;

public class RoomFactory implements IRoomFactory {
	public Room createRoom(){
		Room room = new WarChessRoom();
		room.setMaxPlayersCount(2);
		return room;
	}
}
