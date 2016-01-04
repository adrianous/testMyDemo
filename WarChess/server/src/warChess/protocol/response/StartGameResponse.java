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
    private boolean isBlack;

	@Required
    private boolean isMyTurn;
	
	


	
	public boolean isBlack() {
		return isBlack;
	}
	public void setBlack(boolean isBlack) {
		this.isBlack = isBlack;
	}
	public boolean isMyTurn() {
		return isMyTurn;
	}
	public void setMyTurn(boolean isMyTurn) {
		this.isMyTurn = isMyTurn;
	}
	public StartGameResponse(){}
    public StartGameResponse(final boolean _isBlack){
        this.isBlack = _isBlack;
        this.isMyTurn = _isBlack;
    }

	@Override
	public String toString() {
		return "StartGameResponse [isBlack=" + isBlack + ", isMyTurn=" + isMyTurn
				+ "]";
	}

	
	
}