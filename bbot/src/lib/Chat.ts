import Client from "./Client";


class Chat {
	static instance = null;

	constructor(opts = null) {
		if (Chat.instance || opts === null) return Chat.instance;

		Chat.instance = this;
		const { setPlayers } = opts;
		this.setPlayers = setPlayers;
		this.sio = new Client().sio;

		this.sio.on("newbet", bet => setPlayers(prev => [...prev, bet]));
	}

	resetPlayers = () => this.setPlayers([]);
}


export default Chat;



