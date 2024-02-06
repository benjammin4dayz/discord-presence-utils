# Card Generator

This experimental module is a work in progress. It creates a card representing a given presence like so:

<img alt="Card preview" src="./../img/card.svg" />

GitHub Flavored Markdown (GFM) will heavily sanitize HTML _(including style tags and inline styles)_. We can solve this by [wrapping the HTML inside an SVG](https://pragmaticpineapple.com/adding-custom-html-and-css-to-github-readme/#custom-css-and-html-in-an-svg). Although we lose some interactive functionalities, it's better than nothing!

### Code

```js
import { cardGenerator as getCard } from "discord-presence-utils";

const base64Image = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2ODApLCBxdWFsaXR5ID0gNjUK/9sAQwALCAgKCAcLCgkKDQwLDREcEhEPDxEiGRoUHCkkKyooJCcnLTJANy0wPTAnJzhMOT1DRUhJSCs2T1VORlRAR0hF/9sAQwEMDQ0RDxEhEhIhRS4nLkVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVF/8AAEQgAPAA8AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9Ynl8mB3+XIHG44BPYZrPm12xjVC1wu4lSVQ5PP+RWH47i1lLUXNhqyWtouFkiMIJzn724/hxiuJtJbvzW8zVLh8/eETYDdOTj/PNAHoy6nb311HLNM0McK8FSVDMeME446cc5/Wmw6851CTT7OBZAPlikZur9SWP4k+vB6159M+paeyKup30ucjyzKcDrwAPYH8qtJqE9sQz+YLry/OXyzk9cZ546/jQB6Nc25t7AmR/MmZgXkIxk/0HtXLXuMtk4A5rY09r9vC8Eup3aXU0pEiukezCkcAj1HfpXNa5chIvLU/M/X6UAc5qdz58hwfkXgf41mbVHQYFXZTwarAjnJoA9t1qPzdGvFxn90xx9Of6V51CfmDAciuum1W6aJ1LgqwIOVHSuRjV43ZCD8poAzLy7mt74RyiWGLcNkkLAFuuckg4HT/AOvSanrMFjBeJcvFcIVRY2ifbyMk5Hflq0tStp5rCbYGGV+8O1c2PCtu586+vyehAXgg9sk5oA6Twn4g8/R54ZWbEI3rGeoBqleXLXMxkYcEflXPz3cWj6nB5ZG2Q7Dt7qe5/HmtjOY0PqM0AVpMVCyhj1I+lTSGoS+3r/KgD0RbOPB+dgDxgE1GdPiVCTLJu9Qxyf6VF9q4I4Apj3BUYP6UAVtcP2XSriVHbptyckjPHauS0+9jSZ4JJxOZBn5lKkEDpzkflXUX7LdW0kUhJVhisWWWJ2W0lGRFKkikqAAAckD8M0AcTrs1vLKdsjeYv8CrhR+J5P1rsYmzbRH/AGBXNeJXnv7iJlVn86QlSyjI9sjtzXSJxbxg9lAoAikOM1AWwegNTS9ORUBYA9KAOqa5xzyM80hmbvj6moAcIMAc0yE+ZKQeB7UATO28YxgAZ+tZtxbW7hpJFbdnAIkI/L9atKSXbtjpVY/PHGD0yaAKsNukUnyxswPHztnA9KfIy7mC4xnsKlCgREjsapLIzlmPXdQAstQlvapXOVqu5w1AH//Z`;

getCard(
  {
    appName: "Cat",
    details: "Meow",
    elapsed: "01:00:00 elapsed",
    largeImageText: "Cheezbugar?",
    largeImageUrl: base64Image,
    state: "I fit, therefore I sit",
  },
  { minify: true, svg: true, outfile: "./generated.svg" }
);
```
