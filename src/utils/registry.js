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

  /**
   * Forwards a message to all sessions of all accounts in the given list, except the given session, as this is
   * the session emitting the message in the first place. Other sessions of the same user MUST receive the message
   * though, as they are considered sessions on other terminals.
   * 
   * @param {*} message the message to forward to each and every other session
   * @param {*} accounts the list of usernames to forward the message to
   * @param {*} session the session to not forward the message to as it is the one sending the message
   */
  forward(message, accounts, session) {
    accounts.forEach(account => {
      if (this.accounts[account]) {
        const acc = this.accounts[account];
        Object.keys(acc).forEach(token => {
          if (token !== session.token) acc[token].send(JSON.stringify(message));
        })
      }
    })
  }
}

const registry = new Registry();

export default registry;