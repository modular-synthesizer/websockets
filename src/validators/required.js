import SynpleError from '../exceptions/SynpleError.js'

export default function required(fields) {
  Object.keys(fields).forEach(key => {
    if (!fields[key]) throw new SynpleError(1008, `${key}.required`);
  })
}