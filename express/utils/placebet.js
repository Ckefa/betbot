import session from "express-session";
import Bet from "../models/bet.js";
import User from "../models/user.js";

class PlaceBet {
	constructor(app) {
		app.post("/bet", async (req, resp) => {
			console.log("betting")

			if (!session.user) {
				resp.send({ msg: "failed", detail: "user not logged in" });
				return;
			}

			const { stake } = req.body;

			const user = session.user;

			// if (user.bal < stake) {
			// 	resp.send({ msg: "failed", detail: "insufficient funds" });
			// 	return;
			// };


			const bet = new Bet({
				user: user._id,
				stake: stake,
			});
			// console.log("processing bet");

			user.bal -= stake;
			bet.save();
			user.save();


			resp.send({ msg: "ok", detail: "bet placed successfully", ...bet._doc });
		});


		app.post("/cashout", async (req, resp) => {
			const { betId, odd } = req.body;
			const { user } = session;

			if (!user) {
				resp.send({ mag: "failed", detail: 'user not logged in' });
				return;
			}

			const bet = await Bet.findOne({ _id: betId });
			const updatedUser = await bet.updateBet(odd);

			const { bal: newBal } = updatedUser._doc;
			resp.send({ msg: 'ok', bal: newBal });
		});
	}
}


export default PlaceBet;
