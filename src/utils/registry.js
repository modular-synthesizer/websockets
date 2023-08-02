export class Registry {
  constructor() {
    this.accounts = {};
  }

  addSession(session, socket) {
    if (!(session.username in this.accounts)) {
      this.accounts[session.username] = {}
    }
    this.accounts[session.username][session.token] = socket;
  }
}

const registry = new Registry();

export default registry;