import axios from 'axios';
import * as https from "https";
import SynpleError from '../exceptions/SynpleError.js'

export class Api {
  constructor() {
    this.baseUrl = process.env.API_URL;
    this.instance = axios.create({
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
  }

  get headers() {
    return {
      'X-PRIVATE-KEY': process.env.PRIVATE_KEY,
      'X-PUBLIC-KEY': process.env.PUBLIC_KEY,
    }
  }

  async get(url, params = {}) {
    const config = { url: `${this.baseUrl}${url}`, method: 'get', params, headers: this.headers };
    return (await this.instance(config)).data;
  }

  async getSession(id) {
    if (!id) throw new SynpleError(1008, 'auth_token.required');
    try {
      return await this.get(`/sessions/${id}`, { auth_token: id });
    }
    catch (exception) {
      const error = exception.response.data;
      throw new SynpleError(1008, `${error.key}.${error.message}`);
    }
  }
}

const api = new Api();

export default api;