import axios from 'axios';
import * as https from "https";

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
    try {
      const config = { url: `${this.baseUrl}${url}`, method: 'get', params, headers: this.headers };
      return (await this.instance(config)).data;
    }
    catch (exception) {
      if (error.response) {
        const { key, message } = exception.response.data;
        throw new SynpleError(1008, `${key}.${message}`);
      }
    }
  }
}

const api = new Api();

export default api;