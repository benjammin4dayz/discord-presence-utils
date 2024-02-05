# Process Monitor

This monitor will check running processes on an interval and emit an event when a watched process starts or stops.

## Limitations

Passing a common name shared between unrelated processes can break the detection.

## How it works

1.  Using the `node:child_process` module, `execSync` calls one of the following commands on an interval depending on the host O.S.

    #### Linux

        ps -eo pid,comm,cmd

    #### Windows

        wmic process get ProcessId,Name,ExecutablePath/format:csv

    > 💡 You can try this at home.

2.  The process monitor will then attempt to find a watched process.

    When the process is found:

    - A `start` event is emitted

    When the **found** process stops:

    - A `stop` event is emitted

## Usage

```js
import { ProcMon } from "discord-presence-utils";

const browser = new ProcMon(["chrome", "firefox"]);

browser.on("start", (ps) => {
  console.log(`[${ps.pid}] ${ps.name} detected >> ${ps.path}`);
});
browser.on("stop", (ps) => {
  console.log("Browser not detected; shutting down.");
});
```
