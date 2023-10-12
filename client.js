const WebSocket = require("ws");

const SERVER = "127.0.0.1";
const PORT = "5055";

class Client {
  constructor() {
    this.socket = new WebSocket(`ws://${SERVER}:${PORT}`);
    this.isConnected = false;
    this.callBacks = [];
    this.socket.on("open", () => {
      console.log("[CONNECTED!]");
      this.isConnected = true;
      this.callBacks.forEach((callBack) => callBack());
    });
    this.socket.on("close", () => console.log("[DISCONNECTED!]"));
    this.socket.on("error", (error) =>
      console.log(`[ERROR?]: ${error.message}`)
    );
  }

  send(message) {
    if (this.isConnected) {
      this.socket.send(message);
      console.log("[SENT]");
    } else this.callBacks.push(() => this.send(message));
  }

  fetch() {
    // this.connect();
    this.send("update");

    return new Promise((resolve, reject) => {
      this.socket.once("message", (message) => {
        const data = JSON.parse(message);
        resolve(data);
      });
    });
  }

  quit() {
    if (this.isConnected) {
      this.socket.close();
      this.isConnected = false;
    } else this.callBacks.push(() => this.quit());
  }
}

module.exports = Client;

if (require.main === module) {
  const client = new Client();
  res = client.fetch();
  console.log(res);
  setTimeout(() => client.quit(), 5000);
}
