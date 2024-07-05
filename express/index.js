import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path"

import Auth from "./utils/auth.js";
import PlaceBet from "./utils/placebet.js";

const app = express();
const PORT = process.env.PORT || 7000;
const MONGO = process.env.MONGO || "127.0.0.1";
const MOPORT = process.env.MOPORT || 27017;

app.use(express.static(path.join(process.cwd(), "dist", "assets")));
app.use(express.json());
app.use(cors());


mongoose.connect(`mongodb://${MONGO}:${MOPORT}/ckefa`);

new Auth(app);
new PlaceBet(app);

app.get("/", async (req, resp) => {
	resp.sendFile(path.join(process.cwd(), "dist", "index.html"))
});


app.listen(PORT, async () => {
	console.log(`The app is running on port ${PORT}`);
});


export { app };



