package warChess.protocol.response;

import warChess.protocol.MessagetIds;
import gs.core.annotation.Response;
import gs.core.json.Required;
import gs.core.protocol.BasicResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Response( msgId = MessagetIds.RESPONSE_CHOOSECARD)
public class ChooseCardResponse extends BasicResponse{
	
	@Required
    private boolean isLeft;
	
	public boolean isLeft() {
		return isLeft;
	}
	public void setLeft(boolean isLeft) {
		this.isLeft = isLeft;
	}
	@Required
	private boolean isMyself;
	
	public boolean isMyself() {
		return isMyself;
	}
	public void setMyself(boolean isMyself) {
		this.isMyself = isMyself;
	}
    public ChooseCardResponse(){}
    public ChooseCardResponse(boolean isLeft, boolean isMyself){
        this.isLeft = isLeft;
        this.setMyself(isMyself);
    }

	

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ChooseCardResponse [isLeft=");
		builder.append(isLeft);
		builder.append("]");
		return builder.toString();
	}

	
    
}