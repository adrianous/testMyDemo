package warChess.protocol.request;

import java.util.ArrayList;

import warChess.handler.WarChessHandler;
import warChess.protocol.MessagetIds;
import gs.core.annotation.Request;
import gs.core.json.Required;
import gs.core.protocol.BasicRequest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Request(handler = WarChessHandler.class, msgId = MessagetIds.REQUEST_MOVE)
public class MoveRequest extends BasicRequest {
	@Required
	private int tag;

	private ArrayList<Integer> movePoints;

	public ArrayList<Integer> getMovePoints() {
		return movePoints;
	}

	public void setMovePoints(ArrayList<Integer> movePoints) {
		this.movePoints = movePoints;
	}

	public int getTag() {
		return tag;
	}

	public void setTag(int tag) {
		this.tag = tag;
	}

	public MoveRequest() {
	}

	public MoveRequest(int tag, ArrayList<Integer> movePoints) {
		this.tag = tag;
		this.movePoints = movePoints;
	}

	@Override
	public String toString() {
		return "MoveRequest [tag=" + tag + ", movePoints=" + movePoints + "]";
	}

}