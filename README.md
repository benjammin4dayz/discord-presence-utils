# Discord Presence Utils

Discord Presence Utils is a collection of easy-to-use modules designed to facilitate the management of Discord Rich Presence from your Node application.

| Docs                                | Module    | Description                                                  |
| ----------------------------------- | --------- | ------------------------------------------------------------ |
| [\[ X \]](./doc/discord-rpc.md)     | RPCClient | Simple Discord RPC for setting Rich Presence on Discord.     |
| [\[ X \]](./doc/process-monitor.md) | ProcMon   | Basic process monitor to detect when a game starts or stops. |

## Usage

1.  Install the package with your favorite package manager.

        npm install git+https://github.com/benjammin4dayz/discord-presence-utils

    > 💡 You may opt to install a specific release tag by adding `#v0.0.0` to the end of this link.

2.  Use the provided modules.

    ```js
    import { RPCClient, ProcMon } from "discord-rpc-utils";

    const rpc = new RPCClient();
    const clientId = "1234567890";
    const chrome = new ProcMon(["chrome"]);

    chrome.on("start", () => {
      rpc.connect(clientId);
      rpc.setActivity({
        details: "Hello, world!",
        state: "I have arrived!",
      });
    });

    chrome.on("stop", () => {
      rpc.destroy();
    });
    ```

## Acknowledgements

This repository contains a substantial amount of code from [discordjs/RPC](https://github.com/discordjs/RPC) which is used under the MIT license.
