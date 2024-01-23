# Discord RPC Lite

A stripped-down version of the original DiscordJS RPC client; mainly for managing Rich Presence.

### Why?

The original code is a bit light on documentation and contains more functionality than needed.

## Usage

1.  Install the package with your favorite package manager.

        npm install git+https://github.com/benjammin4dayz/discord-rpc-lite

    > 💡 You may opt to install a specific release tag by adding `#v0.0.0` to the end of this link.

2.  Use the client in your code.

    ```ts
    import RPCLite from "discord-rpc-lite";

    interface ActivityProps {
      buttons?: { label: string; url: string };
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
    const client: any = new RPCLite();
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

## Acknowledgements

This repository contains a substantial amount of code from [discordjs/RPC](https://github.com/discordjs/RPC) which is used under the MIT license.
