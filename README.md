## Messages bodies

This section indicates which field you have to send with every message in the client websocket for them to be correctly handled by recipients after forwarding them.

### Synthesizers messages

Synthesizers messages are forwarded to every user of the synthesizers. They can be forwarded if and only if the user emitting them has the right to write in the synthesizers (having the "write" or "admin" permissions).

#### Parameter edition start

This messages is emitted when a user able to write in the synthesizer starts editing a value by puching down the mouse button on it.

```json
{
  "auth_token": "<TOKEN>",
  "synthesizer_id": "<SYNTH_ID>",
  "resource": "synthesizer",
  "command": "editStart",
  "module_id": "<MODULE_ID>",
  "control_id": "<CONTROL_ID>"
}
```