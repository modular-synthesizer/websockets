export default class SynpleError extends Error {
  constructor(code, reason) {
    super();
    this.code = code;
    this.reason = reason;
  }
}