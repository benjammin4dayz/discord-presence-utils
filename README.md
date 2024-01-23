# Discord RPC Lite

A stripped-down version of the original DiscordJS RPC client; mainly for managing Rich Presence.

### Why?

The original code is a bit light on documentation and contains more functionality than needed.

## Usage

1.  Install the package with your favorite package manager.

        npm i git+https://github.com/benjammin4dayz/discord-rpc-lite

2.  Use it in your code

    ```js
    import RPCLite from "discord-rpc-lite";
    const CLIENT_ID = "69420";
    const disco = new RPCLite();

    const activityProps = {
      buttons: [{ label: "", url: "" }],
      details: "",
      endTimestamp: 2147483647,
      instance,
      largeImageKey: "",
      largeImageText: "",
      partyId,
      partyMax,
      partySize,
      smallImageKey: "",
      smallImageText: "",
      startTimestamp: 0,
      state: "",
    };

    // async/await
    await disco.connect(CLIENT_ID);
    disco.setActivity(activityProps);

    // promise chain
    disco.connect(CLIENT_ID).then(() => {
      disco.setActivity(activityProps);
    });
    ```

## Acknowledgements

This repository contains a substantial amount of code from [discordjs/RPC](https://github.com/discordjs/RPC) which is used under the MIT license.
