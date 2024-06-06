import Client from "./Client";

// Define the betItem type here
type betItem = {
    user: string;
    stake: number;
    odd: number;
    cashout: null | number | boolean;
    won: number | boolean;
};

type chatOptions = {
    setPlayers: (updateFn: (prev: betItem[]) => betItem[]) => void;
};

class Chat {
    public static instance: Chat;
    public setPlayers: ((updateFn: (prev: betItem[]) => betItem[]) => void) | null = null;
    public sio;

    constructor(opts: chatOptions | null = null) {
        if (Chat.instance) {
            return Chat.instance;
        }
        if (!opts) {
            throw new Error("ChatOptions must be provided to initialize Chat");
        }

        Chat.instance = this;
        const { setPlayers } = opts;
        this.setPlayers = setPlayers;
        this.sio = new Client().sio;

        this.sio?.on("newbet", (bet: betItem) => setPlayers((prev: betItem[]) => [...prev, bet]));
    }

    resetPlayers = () => {
        if (this.setPlayers) {
            this.setPlayers(() => []);
        }
    };
}

export default Chat;
