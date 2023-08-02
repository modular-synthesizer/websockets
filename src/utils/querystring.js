import qs from "querystring";

export default function querystring(url) {
  const splitted = url.split('?', 2);
  return qs.parse(splitted[1] || '')
}