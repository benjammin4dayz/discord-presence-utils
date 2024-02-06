/**
 * @typedef {Object} RPCData
 * @property {string} appName
 * @property {string} details
 * @property {string} state
 * @property {string} elapsed "01:00 elapsed" | "01:00:00 elapsed"
 * @property {string} largeImageText
 * @property {string} largeImageUrl
 * @property {string} smallImageText not implemented yet
 * @property {string} smallImageUrl not implemented yet
 */
/**
 * Create a mock card with the given presence data to preview or showcase it.
 * @param {RPCData} param0 RPC Data
 * @param {{minify?: boolean}} param1
 * @returns {string} HTML representing a mock Discord card with the given data
 */
function cardGenerator(
  {
    appName = "",
    details = "",
    state = "",
    elapsed = "",
    largeImageUrl = "",
    largeImageText = "",
  },
  { minify = false }
) {
  const styles = `.card {
  user-select: none;
  width: 300px;
  height: 105px;
  background-color: #111214;
  border-radius: 10px;
  font: 14px sans-serif;
  color: #DCDDDE;
}
.card__container {
  display: flex;
}
.card__header {
  margin: 0 10px;
  padding: 5px 0 0 0;
  cursor: default;
}
.card__large-image-container {
  flex-shrink: 0;
  margin: 10px;
}
.card__large-image-container img {
  width: 60px;
  height: 60px;
  border-radius: 7px;
}
.card__text-container {
  overflow: hidden;
  margin: 10px 0;
  cursor: default;
}
.card__text-container div {
  white-space: nowrap;
}
.card__text-container-title {
  font-weight: bold;
}
.frame {
  width: min-content;
  height: min-content;
  padding: 10px;
  background-color: #232428;
  border-radius: 5px;
}`;

  const generateCard = () =>
    [
      `<html>`,
      `<style>${styles}</style>`,
      `<div class="frame">`,
      `<div class="card">`,
      `<h5 class="card__header">PLAYING A GAME</h5>`,
      `<div class="card__container">`,
      `<div class="card__large-image-container">`,
      `<img`,
      `draggable=false`,
      `src="${largeImageUrl}"`,
      `title="${largeImageText}"`,
      `/>`,
      `</div>`,
      `<div class="card__text-container">`,
      `<div`,
      `class="card__text-container-title"`,
      `title="${appName}"`,
      `>`,
      `${appName}`,
      `</div>`,
      `<div`,
      `class="card__text-container-details"`,
      `title="${details}"`,
      `>`,
      `${details}`,
      `</div>`,
      `<div class="card__text-container-state" title="${state}">`,
      `${state}`,
      `</div>`,
      `<div`,
      `class="card__text-container-time-elapsed"`,
      `>`,
      `${elapsed}`,
      `</div>`,
      `</div>`,
      `</div>`,
      `</div>`,
      `</div>`,
      `</html>`,
    ].join("\n");

  return !minify
    ? generateCard()
    : generateCard().replace(/>\s+</g, "><").replace(/\s+/g, " ");
}

export default cardGenerator;
export { cardGenerator };
