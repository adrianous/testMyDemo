package game;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class PlayerState {
	public String userId;
	public boolean isReady;
	public int resultType;
	private boolean isBlack;
	private boolean isMyTurn;
	public boolean [][]map;
	
		

	public PlayerState (final String _userId,final boolean _isBlack)
	{
		userId = _userId;
		isReady = false;
		resultType = 0;
		setBlack(_isBlack);
	
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
		setBlack(!isBlack());

	
	}

	public boolean isBlack() {
		return isBlack;
	}


	public void setBlack(boolean isBlack) {
		this.isBlack = isBlack;
	}

	public boolean isMyTurn() {
		return isMyTurn;
	}

	public void setMyTurn(boolean isMyTurn) {
		this.isMyTurn = isMyTurn;
	}
	
	
}