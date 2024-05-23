import io from "socket.io-client";

const [HOST, PORT] = ['127.0.0.1', 5055];

class Client {
	static instance = null

	constructor(setData = null, setMessages = null) {
		if (Client.instance) return Client.instance;

		Client.instance = this

		this.setMessages = setMessages
		this.setData = setData
		this.connected = false;
		this.callBacks = [];
		this.sio = io(`ws://${HOST}:${PORT}`);

		this.sio.on("connect", () => {
			this.connected = true;
			console.log("[Connected]");
			this.callBacks.forEach(item => item());
		});


		this.sio.on("status", (data) => console.log(data));

		this.sio.on("disconnect", () => {
			console.log("[Closed]");
			this.connected = false;
		});


		this.sio.emit("update_messages");
	}


	send(msg) {
		if (this.connected) {
			this.sio.emit("message", msg);
			console.log(`[SENT: ${msg} ]`);
			return true
		}
		this.callBacks.push(() => {
			this.sio.emit("message", msg);
			console.log(`[SENT: ${msg} ]`);
		});
	}

	fetch() {
		return new Promise(
			(resolve, reject) =>
				this.sio.emit("update", data => {
					resolve(data);
				})
		);
	}

	update() {
		this.sio.emit("update");
	}
}


export default Client;
