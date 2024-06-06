import io, { Socket } from "socket.io-client";

const [HOST, PORT] = ['127.0.0.1', 5055];

type SetData = (data: any) => void;
type SetMessages = (messages: string) => void;

class Client {
  private static instance: Client | null = null;
  public sio: Socket | null = null;
  public setMessages: SetMessages | null = null;
  public setData: SetData | null = null;
  private connected: boolean = false;
  public callBacks: (() => void)[] = [];

  constructor(setData: SetData | null = null, setMessages: SetMessages | null = null) {
    if (Client.instance) return Client.instance;

    Client.instance = this;
    this.setMessages = setMessages;
    this.setData = setData;
    this.connected = false;
    this.callBacks = [];
    this.sio = io(`ws://${HOST}:${PORT}`);

    this.sio.on("connect", () => {
      this.connected = true;
      console.log("[Connected]");
      this.callBacks.forEach(item => item());
    });

    this.sio.on("status", (data: any) => console.log(data));

    this.sio.on("disconnect", () => {
      console.log("[Closed]");
      this.connected = false;
    });

    this.sio.emit("update_messages");
  }

  public static getInstance(setData: SetData | null = null, setMessages: SetMessages | null = null): Client {
    if (!Client.instance) {
      Client.instance = new Client(setData, setMessages);
      // console.log(this.setData);
    }
    return Client.instance;
  }

  public send(msg: string): boolean {
    if (this.connected) {
      this.sio?.emit("message", msg);
      console.log(`[SENT: ${msg} ]`);
      return true;
    }
    this.callBacks.push(() => {
      this.sio?.emit("message", msg);
      console.log(`[SENT: ${msg} ]`);
    });
    return false;
  }

  public fetch(): Promise<any> {
    return new Promise(resolve => {
      this.sio?.emit("update", (data: any) => {
        resolve(data);
      });
    });
  }

  public update(): void {
    this.sio?.emit("update");
  }
}

export default Client;
