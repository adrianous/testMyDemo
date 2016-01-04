package warChess.protocol.request;

import warChess.handler.WarChessHandler;
import warChess.protocol.MessagetIds;
import gs.core.annotation.Request;
import gs.core.protocol.BasicRequest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Request( handler=WarChessHandler.class, msgId = MessagetIds.REQUEST_ADDPIECE)
public class DrawRequest extends BasicRequest{
}