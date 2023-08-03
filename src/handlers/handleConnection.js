import registry from '../utils/registry.js';
import handleMessage from './handleMessage.js';

export default function handleConnection(socket, _request, session) {
  if (session !== undefined) {
    registry.addSession(session, socket);
    socket.on('message', async data => {
      try {
        const body = JSON.parse(data.toString());
        await handleMessage(body, session);
      }
      catch (exception) {
        console.log(`Error of type ${exception.constructor.name} in body : \n  ${data.toString()}`);
      }
    });
  }
}