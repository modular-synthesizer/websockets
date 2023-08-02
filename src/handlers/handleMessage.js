import parameterEditStart from "./messages/parameterEditStart.js";

/**
 * Handler for the reception of a message in the websocket.
 * @param {Object} data the JSON object of the message sent in the websocket.
 */
export default function handleMessage({ type, payload }, session) {

  console.log(type, payload, session)

  switch(type) {
    case 'parameterEditStart':
      parameterEditStart(payload, session)
  }
}