import { threadId } from "worker_threads";

export class Registry {
  constructor() {
    this.accounts = {};
  }

  addSession({ username, token }, socket) {
    console.log("adding session");
    if (!(username in this.accounts)) {
      this.accounts[username] = {}
    }
    if (!(token in this.accounts[username])) {
      this.accounts[username][token] = []
    }
    this.accounts[username][token].push(socket);
  }

  removeSession({ username, token }, socket) {
    if (username in this.accounts) {
      if (token in this.accounts[username]) {
        const idx = this.accounts[username][token].indexOf(socket);
        this.accounts[username][token].splice(idx, 1);
      }
    }
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
          if (token !== session.token) {
            acc[token].forEach(socket => socket.send(JSON.stringify(message)));
          }
        })
      }
    })
  }
}

const registry = new Registry();

export default registry;