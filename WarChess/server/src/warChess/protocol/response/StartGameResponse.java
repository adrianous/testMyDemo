package warChess.protocol.response;

import warChess.protocol.MessagetIds;
import gs.core.annotation.Response;
import gs.core.json.Required;
import gs.core.protocol.BasicResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Response( msgId = MessagetIds.RESPONSE_START_GAME)
public class StartGameResponse extends BasicResponse{
	@Required
    private int teamType;

	@Required
    private boolean isMyTurn;
	
	


	

	public int getTeamType() {
		return teamType;
	}
	public void setTeamType(int teamType) {
		this.teamType = teamType;
	}
	public boolean isMyTurn() {
		return isMyTurn;
	}
	public void setMyTurn(boolean isMyTurn) {
		this.isMyTurn = isMyTurn;
	}
	public StartGameResponse(){}
    public StartGameResponse(final int _teamType){
        this.teamType = _teamType;
    }

	@Override
	public String toString() {
		return "StartGameResponse [_iteamType=" + teamType + ", isMyTurn=" + isMyTurn
				+ "]";
	}

	
	
}