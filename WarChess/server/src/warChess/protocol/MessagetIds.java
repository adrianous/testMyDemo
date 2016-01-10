package warChess.protocol;

public class MessagetIds {
	
	//请求
	public static final int REQUEST_CHOOSECARD = 101;
	public static final int REQUEST_EMOJI = 102;
	public static final int REQUEST_REFIGHT = 103;
	public static final int REQUEST_END_ROUND = 104;
	public static final int REQUEST_MOVE = 105;
	public static final int REQUEST_ATTACK = 106;
	public static final int REQUEST_GIVEUP = 107;
	public static final int REQUEST_RETRACTENSURE = 108;
	public static final int REQUEST_DRAWENSURE = 109;

	//响应
	public static final int RESPONSE_START_GAME = 205;
	public static final int RESPONSE_CHOOSECARD = 206;
	public static final int RESPONSE_EMOJI = 207;
	public static final int RESPONSE_RESULT = 208;
	public static final int RESPONSE_REFIGHT = 209;
	public static final int RESPONSE_EXIT = 210;
	public static final int RESPONSE_START_ROUND = 211;
	public static final int RESPONSE_MOVE = 212;
	public static final int RESPONSE_ENDROUND = 213;
	public static final int RESPONSE_ATTACK = 214;
	public static final int RESPONSE_GIVEUP = 215;
	public static final int RESPONSE_RETRACTENSURE = 216;
	public static final int  RESPONSE_OPREADY = 217;

}