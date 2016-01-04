package warChess.protocol.request;
import warChess.protocol.MessagetIds;
import warChess.handler.WarChessHandler;
import gs.core.annotation.Request;
import gs.core.protocol.BasicRequest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Request( handler=WarChessHandler.class, msgId = MessagetIds.REQUEST_END_ROUND)
public class EndRoundRequest extends BasicRequest{
}