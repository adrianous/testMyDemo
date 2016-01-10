package warChess.protocol.response;

import warChess.protocol.MessagetIds;
import gs.core.annotation.Response;
import gs.core.json.Required;
import gs.core.protocol.BasicResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Response(  msgId = MessagetIds.RESPONSE_ATTACK)
public class AttackResponse extends BasicResponse{
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
	public AttackResponse()
	{
		super();
	}
	public AttackResponse(int attackTag, int damage, int attackedTag) {
		super();
		this.attackTag = attackTag;
		this.damage = damage;
		this.attackedTag = attackedTag;
	}
	@Override
	public String toString() {
		return "AttackResponse [attackTag=" + attackTag + ", damage=" + damage
				+ ", attackedTag=" + attackedTag + "]";
	}
}