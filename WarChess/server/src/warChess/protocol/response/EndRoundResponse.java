package warChess.protocol.response;

import warChess.protocol.MessagetIds;
import gs.core.annotation.Response;
import gs.core.protocol.BasicResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Response(  msgId = MessagetIds.RESPONSE_ENDROUND)
public class EndRoundResponse extends BasicResponse{

	@Override
	public String toString() {
		return "EndRoundResponse []";
	}
	
}