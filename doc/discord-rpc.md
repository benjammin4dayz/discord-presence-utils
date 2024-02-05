# Discord RPC Lite

This module was refactored from the original DiscordJS version to strip non-essential code.
It should work as a drag-and-drop replacement for RPC clients that only rely
on this class to connect and manage Rich Presence activity on Discord.

> ❓ Missing something? Try the full-featured [DiscordJS/RPC](https://github.com/discordjs/RPC)

### Usage Example

```ts
import { RPCClient } from "discord-presence-utils";

interface ActivityProps {
  buttons?: {
    label: string;
    url: string;
  };
  details?: string;
  endTimestamp?: number; // unix time
  instance?: boolean;
  joinSecret?: string;
  largeImageKey?: string;
  largeImageText?: string;
  matchSecret?: string;
  partyId?: string;
  partyMax?: string;
  partySize?: string;
  smallImageKey?: string;
  smallImageText?: string;
  spectateSecret?: string;
  startTimestamp?: number; // unix time
  state?: string;
}

// Initialize
const client: any = new RPCClient();
const clientId: string = "69420";
const presence: ActivityProps = {
  details: "Hello, world!",
  state: "I have arrived!",
};

// Call methods
await client.connect(clientId); // find and connect to Discord
await client.setActivity(presence); // set user's rich presence
await client.clearActivity(); // clear user's rich presence
await client.destroy(); // destroy the IPC transport

// Listen for events
client.on("connected", () => {
  console.log("Client connected: ready to receive commands.");
});
client.on("disconnected", () => {
  console.log("Client disconnected: IPC transport closed.");
});
```

> 💡 Image keys can be an external URL or the key of a cached art asset in your Discord Application.
