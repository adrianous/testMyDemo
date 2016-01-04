package warChess.protocol.response;

import warChess.protocol.MessagetIds;
import gs.core.annotation.Response;
import gs.core.json.Required;
import gs.core.protocol.BasicResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Response( msgId = MessagetIds.RESPONSE_RETRACTENSURE)
public class RetractEnsureResponse extends BasicResponse{
	
	@Required
    private boolean sure;
    public RetractEnsureResponse(){}
    public RetractEnsureResponse(boolean sure){
        this.sure = sure;
    }
	
	public boolean isSure() {
		return sure;
	}
	public void setSure(boolean sure) {
		this.sure = sure;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("RetractEnsureResponse [sure=");
		builder.append(sure);
		builder.append("]");
		return builder.toString();
	}
    
}