import { w3cwebsocket as WebSocket } from "websocket";

const SERVER = "127.0.0.1";
const PORT = "5055";

type parData = {
  time: number;
  md: number;
  fixtures: [];
  results: [];
  table: [];
};

class Client {
  private socket: WebSocket;
  public isConnected: boolean;
  private callBacks: (() => void)[] = [];

  constructor() {
    this.socket = new WebSocket(`ws://${SERVER}:${PORT}`);
    this.isConnected = false;

    this.socket.onopen = () => {
      console.log("[CONNECTED!]");
      this.isConnected = true;
      this.callBacks.forEach((callBack) => callBack());
    };

    this.socket.onclose = () => console.log("[DISCONNECTED!]");
    this.socket.onerror = (error) => console.log(`[ERROR?]: ${error.message}`);
  }

  send(message: string) {
    if (this.isConnected) {
      this.socket.send(message);
      console.log("[SENT]");
    } else {
      this.callBacks.push(() => this.send(message));
    }
  }

  fetch(): Promise<parData> {
    this.send("update");

    return new Promise(
      (resolve) =>
        (this.socket.onmessage = (message) => {
          const data = JSON.parse(message.data.toString());
          resolve(data);
        })
    );
  }

  quit() {
    if (this.isConnected) {
      this.socket.close();
      this.isConnected = false;
    } else {
      this.callBacks.push(() => this.quit());
    }
  }
}

export default Client;
