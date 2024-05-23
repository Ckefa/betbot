import User from "../models/user.js";
import session from "express-session";

class Auth {
	constructor(app) {
		app.get("/status", async (req, resp) => {
			if (!session.user) {
				resp.send({ msg: "user not logged in" });
				return;
			}

			const { _id: userId } = session.user._doc;
			const user = await User.findOne({ _id: userId });

			resp.send({ ...user._doc, msg: "ok" });
		});

		app.post("/signup", async (req, resp) => {
			const { name, email, passwd } = req.body;

			const exist = await User.findOne({ name: name }) || await User.findOne({ email: email });

			if (exist) {
				console.log(name, "already exists in document");

				resp.send({ msg: "failed", detail: `${exist.name} already exists` });
				return;
			}

			const user = new User({ name: name, email: email, passwd: passwd, bal: 0.0 });
			await user.save();

			session.user = user
			resp.send({ msg: "ok", detail: `${user.name} ${user.email} created successull` });
		});

		app.post("/login", async (req, resp) => {
			const { name, passwd, email } = req.body;

			const user = await User.findOne({ name: name }) || await User.findOne({ email: email });

			if (! await user) {
				resp.send({ "msg": "failed", detail: "user not registered" });
			} else if (user.passwd == passwd) {
				user.sayHello();
				session.user = user;

				resp.status(200).send({ "msg": "ok", detail: "login successful" });
				return;
			} else if (user.passwd !== passwd) {
				resp.status(200).send({ "msg": "failed", detail: "wrong password" });
				return;
			}
		});

		app.get("/logout", (req, resp) => {
			if (session.user) delete session.user;

			resp.send({ msg: "ok", detail: "logout successful" });
		});
	}
}

export default Auth;
