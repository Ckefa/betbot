import axios from "axios";

import Client from "@/lib/Client";


const host = "http://localhost:7000";


class Account {
  name: string | null;
  bal: number;
  activeBet: boolean;
  stake: number;
  betId: null;

  constructor(opts) {
    this._id = null;
    this.name = null;
    this.bal = 0.00;
    this.activeBet = false;
    this.setBet = opts.setBet;
    this.setCashed = opts.setCashed;
    this.setPending = opts.setPending;
    this.stake = 0;
    const client = new Client();
    this.sio = client.sio;

    axios.get(`${host}/status`)
      .then(resp => {
        // console.log(resp.data)
        this._id = resp.data._id;
        this.name = resp.data.name;
        this.bal = resp.data.bal;
      });
  }

  updateAccount = () => {
    this.setBet(0);
    this.setCashed(0);
    this.activeBet = false;
    this.stake = 0;

  }

  placeBet = async (amt: number, showBust: boolean, isRetry: boolean = false) => {
    if (amt <= 0) return;

    console.log(`place bet ${amt} request`);
    this.stake = amt;

    if (!isRetry && (this.activeBet || !showBust)) {
      this.callBack = () => this.placeBet(amt, true, true);
      this.setPending(true);
      return false;
    }
    else {
      this.callBack = null;
    }

    console.log(`placing bet ${amt}`);
    this.stake = amt;

    const bet = {
      user: this.name, stake: this.stake,
      cashout: 0, odd: 0, won: 0
    };



    const resp = await axios.post(`${host}/bet`, bet);
    const respData = await resp.data;

    console.log(respData);
    this.betId = respData._id;


    this.sio.emit("place_bet", bet);
    this.activeBet = true;
    this.bal -= amt;

    this.setBet(amt);
    this.setPending(false);
  }

  cashierAction = (bet: number, mult, showBust: boolean) => {

    if (!this.betId || !this.activeBet) {
      console.log("no activve bets");
      return;
    }

    axios.post(`${host}/cashout`, { betId: this.betId, odd: mult })
      .then(resp => {
        console.log(resp.data);
        const { bal } = resp.data;
        this.bal = bal;
      });

    const mtp = !showBust ? mult : 1;

    if (mtp <= 1) this.activeBet = false;

    this.setBet(0);
    this.setCashed(mtp);
  };

  cancelBet = () => {
    this.stake = 0;
    this.activeBet = false;
    this.callBack = null;

    this.setPending(false);
    this.setBet(0);
  }

}

export default Account;
