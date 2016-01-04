package warChess.protocol.response;

import warChess.protocol.MessagetIds;
import gs.core.annotation.Response;
import gs.core.json.Required;
import gs.core.protocol.BasicResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Response( msgId = MessagetIds.RESPONSE_DRAW_ENSURE)
public class DrawEnsureResponse extends BasicResponse{
	
	@Required
    private boolean isSrue;
    public DrawEnsureResponse(){}
    public DrawEnsureResponse(boolean isSrue){
        this.isSrue = isSrue;
    }
	public boolean isSrue() {
		return isSrue;
	}
	public void setSrue(boolean isSrue) {
		this.isSrue = isSrue;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DrawEnsureResponse [isSrue=");
		builder.append(isSrue);
		builder.append("]");
		return builder.toString();
	}
	
    
}