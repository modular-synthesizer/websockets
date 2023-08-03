import synthesizerFetch from "../../api/synthesizerFetch.js";
import registry from "../../utils/registry.js";

export default async function parameterEditStart(message, session) {
  const synthesizer = await synthesizerFetch(message.payload.synthesizer_id, session);
  const membership = synthesizer.members.find(m => m.username === session.username);
  if (membership && membership.type !== 'read') {
    registry.forward(message, synthesizer.members.map(m => m.username), session);
  }
}