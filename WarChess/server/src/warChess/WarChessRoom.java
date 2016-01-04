package warChess;

import game.PlayerState;
import warChess.protocol.response.DrawEnsureResponse;
import warChess.protocol.response.ExitResponse;
import warChess.protocol.response.ResultResponse;
import warChess.protocol.response.RetractEnsureResponse;
import warChess.protocol.response.StartGameResponse;
import gs.core.basic.AbstractRoom;
import gs.core.protocol.PlayerData;
import gs.core.protocol.PlayerData.PlayerStatus;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

//import game.GameState;

public class WarChessRoom extends AbstractRoom {
	
	private 	List<PlayerState> playerList = new ArrayList<PlayerState>();
	public int cutDownId = 1;
	public int retractId = 1001;
	public int drawId = 2001;
	public String drawUsrId  = null;
	public String retractUsrId  = null;
	
	public boolean isBlack;
	public boolean isInGame = true;

	public List<PlayerState> getPlayerList() {
		return playerList;
	}

	public void setPlayerList(List<PlayerState> playerList) {
		this.playerList = playerList;
	}

	public WarChessRoom() {
		super();
		this.isInGame = true;
		 Random rdm = new Random(System.currentTimeMillis());
		 isBlack = rdm.nextBoolean();
	}

	@Override
	public void onRoomCreated() {
		// TODO Auto-generated method stub
	}

	@Override
	public void onPlayerIn(String playerId) {
		// TODO Auto-generated method stub
		this.playerList.add(new PlayerState(playerId,isBlack));
		isBlack  = !isBlack;
		
		System.out.println( playerId + "进入房间！！！！！！！！！！");

		System.out.println("sendsendsend gamestart;");
		
		PlayerStatus anotherStatus = this.getAnotherStatus(playerId);
		if(anotherStatus == PlayerStatus.OUT || anotherStatus == PlayerStatus.OFFLINE){
			String anotherPlayerId = this.getAnotherPlayerId(playerId);
			this.sendExitMessage(anotherPlayerId);
			this.sendStartMessage();
			System.out.println( "小伙伴 游戏开始了!!!!!!!");
		}else if(anotherStatus == PlayerStatus.ONLINE)
		{
			this.sendStartMessage();
			this.addTimer(61000, cutDownId);
			System.out.println( "小伙伴 游戏开始了!!!!!!!");
		}
//		this.sendStartMessage();

	}
	
	public void sendStartMessage(){
		//向客户端发送开始消息
		StartGameResponse play1 = new StartGameResponse(this.getPlayerState(this.getPlayers().get(0)).isBlack());
		StartGameResponse play2 = new StartGameResponse(this.getPlayerState(this.getPlayers().get(1)).isBlack());
		this.sendMessage(this.getPlayers().get(0), play1);
		this.sendMessage(this.getPlayers().get(1), play2);
	}

	@Override
	public void onPlayerOut(String playerId) {
		// TODO Auto-generated method stub
		System.out.println(playerId+"退出了房间");
		
	
		
		this.sendExitMessage(playerId);

	}

	@Override
	public void onPlayerDropped(String playerId) {
		// TODO Auto-generated method stub
		System.out.println(playerId+"退出了房间");
	
		this.sendExitMessage(playerId);

	}
	
	
	public void sendExitMessage(String currPlayerId){
		
		//如果另一个玩家也掉了 就关闭房间
		PlayerStatus anotherStatus = this.getAnotherStatus(currPlayerId);
		if(anotherStatus == PlayerStatus.OUT || anotherStatus == PlayerStatus.OFFLINE){
			this.close();
			return;
		}
		if(this.isInGame)
		{
			this.isInGame = false;
			this.setRounds(this.getRounds() + 1);
			PlayerData currPlayerData =  this.getPlayerData(currPlayerId);
			currPlayerData.lost();
			PlayerData anotherPlayerData =  this.getPlayerData(this.getAnotherPlayerId(currPlayerId));
			anotherPlayerData.win();
		
		}
		String anotherPlayerId = this.getAnotherPlayerId(currPlayerId);
		ExitResponse exit_resp = new ExitResponse();
		this.sendMessage(anotherPlayerId,exit_resp);
		
	}




	public PlayerStatus getAnotherStatus(String currPlayerId){
		
		String anotherPlayerId = this.getAnotherPlayerId(currPlayerId);
		if(anotherPlayerId != null){
			PlayerData playerData =  this.getPlayerData(anotherPlayerId);
			return playerData.getStatus();
		}
		
		return PlayerStatus.NOT_ENTER;
	}
	
	public String getAnotherPlayerId(String currPlayerId){
		
		List<String> playerIds = this.getPlayers();
		Iterator<String> iterator = playerIds.iterator();
		while(iterator.hasNext())
		{
			String anotherPlayerId = iterator.next();
			if(!anotherPlayerId.equals(currPlayerId))
			{
				return anotherPlayerId;
			}
		}
		
		return null;
	}
	


	@Override
	public void onPlayerReentry(String playerId) {
		// TODO Auto-generated method stub

	}
	@Override
	public void onTimerCallback(final int eventId) {
		// TODO Auto-generated method stub
		if(eventId == this.cutDownId){
			this.changeTimeId();
			this.SendResultMsg();
		}
		
		if(eventId == this.retractId)
		{
			this.changeRetractId();
			if(this.retractUsrId != null)
			{
				this.sendMessage(this.retractUsrId, new RetractEnsureResponse(false));
				this.retractUsrId = null;
			}
			//发送悔棋超时信息不同意
		}
		if(eventId == this.drawId)
		{
			this.changeDrawId();
			if(this.drawUsrId != null)
			{
				this.sendMessage(this.drawUsrId, new DrawEnsureResponse(false));
				this.drawUsrId = null;
			}
			//发送和棋超时信息不同意 
		}
	}
	
	public PlayerState getPlayerState(final String playId)
	{
		PlayerState player = null;
		Iterator<PlayerState> iterator = this.playerList.iterator();
		while(iterator.hasNext())
		{
			player = iterator.next();
			if(playId.equals(player.userId))
			{
				return player;
			}
		}
		return player;
	}
	
	public String getAnotherId(final String playId)
	{
		
		PlayerState player = null;
		Iterator<PlayerState> iterator = this.playerList.iterator();
		while(iterator.hasNext())
		{
			player = iterator.next();
			if(!playId.equals(player.userId))
			{
				return player.userId;
			}
		}
		
		return null;
	}
	
	//删除玩家
	public void  removePlayer(String playerId){
		int i = 0;
		Iterator<PlayerState> iterator = this.playerList.iterator();
		while(iterator.hasNext())
		{
			if(playerId.equals(iterator.next().userId))
			{
				playerList.remove(i);
			}
			i++;
		}
	}
	
	
	//发送玩家开始
	public void SendStartRoundResponse(){
		
	}
	
	//发送结果
	public void SendResultMsg()
	{
		
		PlayerState player = null;
		Iterator<PlayerState> iterator = this.playerList.iterator();
		while(iterator.hasNext())
		{
			player = iterator.next();
			if(player.isMyTurn())
			{
				this.sendMessage(player.userId, new ResultResponse(2,true));
				this.sendMessage(this.getAnotherId(player.userId), new ResultResponse(1,true));
				this.stopAllTimers();
				this.isInGame = false;
				this.setRounds(this.getRounds() + 1);
				
				PlayerData currPlayerData =  this.getPlayerData(player.userId);
				currPlayerData.lost();
					
				PlayerData anotherPlayerData =  this.getPlayerData(this.getAnotherId(player.userId));
				anotherPlayerData.win();
				
			}
		}
	}	
	
	public void changeTimeId()
	{
		this.cutDownId++;
		if(this.cutDownId > 1000)
			this.cutDownId =1;
	}
	
	public void changeRetractId(){
		this.retractId ++;
		if(this.retractId > 2000)
			this.retractId =1001;
	}
	
	public void changeDrawId()
	{
		this.drawId ++;
		if(this.drawId > 3000)
			this.drawId =2001;
	}

}
