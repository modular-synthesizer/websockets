import axios from 'axios';
import * as https from "https";
import 'dotenv/config';

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
    return await this.makeRequest({
      method: 'get',
      url: `${this.baseUrl}${url}`,
      params,
    });
  }

  async makeRequest(config) {
    try {
      return (await this.instance({ ...config, headers: this.headers })).data;
    }
    catch (exception) {
      if (exception.response) {
        const { key, message } = exception.response.data;
        throw new SynpleError(1008, `${key}.${message}`);
      }
    }
  }
}

const api = new Api();

export default api;