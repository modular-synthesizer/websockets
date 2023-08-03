import api from "../utils/api.js";
import required from "../validators/required.js"

export default async function synthesizerFetch(id, session) {
  required({synthsizer_id: id});
  return await api.get(`/synthesizers/${id}`, { auth_token: session.token });
}