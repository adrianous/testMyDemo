package warChess.protocol.request;

import warChess.handler.WarChessHandler;
import warChess.protocol.MessagetIds;
import gs.core.annotation.Request;
import gs.core.json.Required;
import gs.core.protocol.BasicRequest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Request( handler=WarChessHandler.class, msgId = MessagetIds.REQUEST_CHOOSECARD)
public class ChooseCardRequest extends BasicRequest{
	 @Required
	  private boolean  left;

	
	
	public boolean isLeft() {
		return left;
	}
	public void setLeft(boolean left) {
		this.left = left;
	}
	public ChooseCardRequest(){}
    public ChooseCardRequest(Boolean isLeft){
    	 this.left = isLeft;
    }
    
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ChooseCardRequest [left=");
		builder.append(left);
		builder.append("]");
		return builder.toString();
	}
}