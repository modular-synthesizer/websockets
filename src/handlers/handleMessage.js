import parameterEditStart from "./messages/parameterEditStart.js";

/**
 * Handler for the reception of a message in the websocket.
 * @param {Object} data the JSON object of the message sent in the websocket.
 */
export default async function handleMessage(message, session) {
  switch(message.type) {
    case 'parameterEditStart':
      await parameterEditStart(message, session)
  }
}