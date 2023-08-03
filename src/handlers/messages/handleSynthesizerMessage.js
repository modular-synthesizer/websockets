import synthesizerFetch from "../../api/synthesizerFetch.js";
import registry from "../../utils/registry.js";

export default async function handleSynthesizerMessage(message, session) {
  const synthesizer = await synthesizerFetch(message.payload.synthesizer_id, session);
  const membership = synthesizer.members.find(m => m.username === session.username);
  if (membership && membership.type !== 'read') {
    const accounts = synthesizer.members.map(m => m.username);
    registry.forward(message, accounts, session);
  }
}