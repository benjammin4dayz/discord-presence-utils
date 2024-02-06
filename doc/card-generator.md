# Card Generator

This experimental module is a work in progress. It creates a card representing a given presence like so:

<html><style>.card { user-select: none; width: 300px; height: 105px; background-color: #111214; border-radius: 10px; font: 14px sans-serif; color: #DCDDDE; } .card__container { display: flex; } .card__header { margin: 0 10px; padding: 5px 0 0 0; cursor: default; } .card__large-image-container { flex-shrink: 0; margin: 10px; } .card__large-image-container img { width: 60px; height: 60px; border-radius: 7px; } .card__text-container { overflow: hidden; margin: 10px 0; cursor: default; } .card__text-container div { white-space: nowrap; } .card__text-container-title { font-weight: bold; } .frame { width: min-content; height: min-content; padding: 10px; background-color: #232428; border-radius: 5px; }</style><div class="frame"><div class="card"><h5 class="card__header">PLAYING A GAME</h5><div class="card__container"><div class="card__large-image-container"><img draggable=false src="https://placekitten.com/60/60" title="Cheezbugar?" /></div><div class="card__text-container"><div class="card__text-container-title" title="Cat" > Cat </div><div class="card__text-container-details" title="Meow" > Meow </div><div class="card__text-container-state" title="I fit, therefore I sit"> I fit, therefore I sit </div><div class="card__text-container-time-elapsed" > 01:00:00 elapsed </div></div></div></div></div></html>

### Code

```js
import { cardGenerator as getCard } from "discord-presence-utils";
import fs from "fs";

fs.writeFileSync(
  "./generated.html",
  getCard(
    {
      appName: "Cat",
      details: "Meow",
      elapsed: "01:00:00 elapsed",
      largeImageText: "Cheezbugar?",
      largeImageUrl: "https://placekitten.com/60/60",
      state: "I fit, therefore I sit",
    },
    { minify: true }
  ),
  "utf-8"
);
```
