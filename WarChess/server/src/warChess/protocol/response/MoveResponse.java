package warChess.protocol.response;

import java.util.ArrayList;

import warChess.protocol.MessagetIds;
import gs.core.annotation.Response;
import gs.core.json.Required;
import gs.core.protocol.BasicResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Response( msgId = MessagetIds.RESPONSE_MOVE)
public class MoveResponse extends BasicResponse{
	
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

	public MoveResponse() {
	}

	public MoveResponse(int tag, ArrayList<Integer> movePoints) {
		this.tag = tag;
		this.movePoints = movePoints;
	}

	@Override
	public String toString() {
		return "MoveResponse [tag=" + tag + ", movePoints=" + movePoints + "]";
	}

}