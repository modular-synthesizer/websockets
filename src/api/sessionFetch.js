import api from '../utils/api.js'
import required from '../validators/required.js';

export default async function sessionFetch(id) {
  required({ "auth_token" : id });
  return await api.get(`/sessions/${id}`, { auth_token: id });
}q