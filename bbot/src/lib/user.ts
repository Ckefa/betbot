class User {
  public static _instance: User | null = null;
  name: string | null = null;
  bal: number | null = 0.00;

  constructor(name = null, bal = 0.0) {
    if (User._instance) return User._instance;

    User._instance = this;
    this.name = name;
    this.bal = bal;
  }

  checkBalance(): void {
    console.log(this.name, this.bal);
  }
}

export default User;
