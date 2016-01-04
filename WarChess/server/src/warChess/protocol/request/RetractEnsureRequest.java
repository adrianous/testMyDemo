package warChess.protocol.request;
import warChess.protocol.MessagetIds;
import warChess.handler.WarChessHandler;
import gs.core.annotation.Request;
import gs.core.json.Required;
import gs.core.protocol.BasicRequest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Request( handler=WarChessHandler.class, msgId = MessagetIds.REQUEST_RETRACTENSURE)
public class RetractEnsureRequest extends BasicRequest{
	 @Required
	  private boolean  sure;

	

	public boolean isSure() {
		return sure;
	}
	public void setSure(boolean sure) {
		this.sure = sure;
	}
	public RetractEnsureRequest(){}
    public RetractEnsureRequest(Boolean sure ){
    	 this.sure = sure;
    }
    
    
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("RetractEnsureRequest [sure=");
		builder.append(sure);
		builder.append("]");
		return builder.toString();
	}
}