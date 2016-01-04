package warChess.protocol.request;

import warChess.handler.WarChessHandler;
import warChess.protocol.MessagetIds;
import gs.core.annotation.Request;
import gs.core.json.Required;
import gs.core.protocol.BasicRequest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Request( handler=WarChessHandler.class, msgId = MessagetIds.REQUEST_ADDPIECE)
public class DrawEnsureRequest extends BasicRequest{
	 @Required
	  private boolean  sure;


	
	public boolean isSure() {
		return sure;
	}
	public void setSure(boolean sure) {
		this.sure = sure;
	}
	public DrawEnsureRequest(){}
    public DrawEnsureRequest(Boolean sure ){
    	 this.sure = sure;
    }
    
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DrawEnsureRequest [sure=");
		builder.append(sure);
		builder.append("]");
		return builder.toString();
	}
}