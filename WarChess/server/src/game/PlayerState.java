package game;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class PlayerState {
	public String userId;
	public boolean isReady;
	public int chooseCard;
	public int resultType;
	private int teamType;
	private boolean isMyTurn;
	public boolean [][]map;
	
		

	public PlayerState (final String _userId,final int teamType)
	{
		userId = _userId;
		isReady = false;
		resultType = 0;
		chooseCard = 0;
		setTeamType(teamType);
		if(teamType == 1 )
		{
			isMyTurn = true;
		}
		else
		{
			isMyTurn = false;

		}
	
	}

	
	public int getResultType() {
		return resultType;
	}


	public void setResultType(int resultType) {
		this.resultType = resultType;
	}

	public void resetData(){
		isReady = false;
		resultType = 0;
		isReady = false;
		resultType = 0;
		chooseCard = 0;
		setTeamType(0);

	}

	public int getTeamType() {
		return teamType;
	}


	public void setTeamType(int teamType) {
		this.teamType = teamType;
	}


	public boolean isMyTurn() {
		return isMyTurn;
	}

	public void setMyTurn(boolean isMyTurn) {
		this.isMyTurn = isMyTurn;
	}
	
	
}