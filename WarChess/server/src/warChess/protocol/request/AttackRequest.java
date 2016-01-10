package warChess.protocol.request;
import warChess.protocol.MessagetIds;
import warChess.handler.WarChessHandler;
import gs.core.annotation.Request;
import gs.core.json.Required;
import gs.core.protocol.BasicRequest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Request( handler=WarChessHandler.class, msgId = MessagetIds.REQUEST_ATTACK)
public class AttackRequest extends BasicRequest{
	@Required
	private int attackTag;
	@Required
	private int damage;
	@Required
	private int attackedTag;
	
	public int getAttackTag() {
		return attackTag;
	}
	public void setAttackTag(int attackTag) {
		this.attackTag = attackTag;
	}
	public int getDamage() {
		return damage;
	}
	public void setDamage(int damage) {
		this.damage = damage;
	}
	public int getAttackedTag() {
		return attackedTag;
	}
	public void setAttackedTag(int attackedTag) {
		this.attackedTag = attackedTag;
	}
	public AttackRequest()
	{
		super();
	}
	public AttackRequest(int attackTag, int damage, int attackedTag) {
		super();
		this.attackTag = attackTag;
		this.damage = damage;
		this.attackedTag = attackedTag;
	}
	@Override
	public String toString() {
		return "AttackRequest [attackTag=" + attackTag + ", damage=" + damage
				+ ", attackedTag=" + attackedTag + "]";
	}
	
	
}