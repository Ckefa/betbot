import mongoose from "mongoose";
import User from "./user.js";

const { Schema, model } = mongoose;


const betSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	stake: {
		type: Number,
		min: 1
	},
	pending: {
		type: Boolean,
		default: true
	},
	won: {
		type: Number,
		default: 0
	}
	,
	// default: true
});


betSchema.methods.updateBet = async function(odd) {
	try {
		this.won = this.stake * odd;
		this.pending = false;
		await this.save();
		console.log(`bet ${this._id} updated successful`);

		const user = await User.findOne({ _id: this.user });
		user.bal += this.won;
		await user.save();
		return { msg: "ok", ...user };
	}
	catch (err) {
		return { msg: "failed", error: err };
	}
};

const Bet = model('bet', betSchema);

export default Bet;

