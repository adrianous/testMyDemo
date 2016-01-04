package warChess.protocol.response;


import warChess.protocol.MessagetIds;
import gs.core.annotation.Response;
import gs.core.json.Required;
import gs.core.protocol.BasicResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Response( msgId = MessagetIds.RESPONSE_RESULT)
public class ResultResponse extends BasicResponse{
   
    @Required
    private int result;
    public int getResult(){
        return this.result;
    }
    public void setRoundResult(int result){
        this.result = result;
    }
    
	@Required
	private boolean outTime;
	
	public boolean isOutTime() {
		return outTime;
	}
	public void setOutTime(boolean outTime) {
		this.outTime = outTime;
	}
	
	public ResultResponse(){}
    public ResultResponse( int result, boolean outTime){
    	System.out.print("sdfsdfsf");
        this.result = result;
        this.outTime = outTime;
    }
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ResultResponse [result=");
		builder.append(result);
		builder.append(", outTime=");
		builder.append(outTime);
		builder.append("]");
		return builder.toString();
	}

}