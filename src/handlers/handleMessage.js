import synthesizerMessage from "./messages/handleSynthesizerMessage.js";
import required from '../validators/required.js';

/**
 * Handler for the reception of a message in the websocket.
 * @param {Object} data the JSON object of the message sent in the websocket.
 */
export default async function handleMessage(message, session) {
  required({ 'resource': message.resource, 'operation': message.operation });
  
  switch(message.resource) {
    case 'synthesizer':
      await synthesizerMessage(message, session);
      break;
  }
}