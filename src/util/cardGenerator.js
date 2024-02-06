import fs from "fs";
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
 *
 * @param {RPCData} rpcData
 * @param {Object} param1
 * @property {boolean} param1.minify if true, minify the HTML
 * @property {boolean} param1.svg if true, wrap generated HTML in an SVG
 * @property {string} param1.outfile if provided, write the generated data to a file
 * @returns {string} Raw or SVG-wrapped HTML
 */
function cardGenerator(
  rpcData,
  { minify = false, svg = false, outfile = null }
) {
  const htmlString = _cardGenerator(rpcData, { minify });
  let output = "";
  if (!svg) output = htmlString;
  else output = _wrapSVG({ html: htmlString });
  if (outfile) fs.writeFileSync(outfile, output);
  return output;
}
/**
 * Create a mock card with the given presence data to preview or showcase it.
 * @param {RPCData} param0 RPC Data
 * @param {{minify?: boolean}} param1
 * @returns {string} HTML representing a mock Discord card with the given data
 */
function _cardGenerator(
  {
    appName = "",
    details = "",
    state = "",
    elapsed = "",
    largeImageUrl = "",
    largeImageText = "",
  },
  { minify }
) {
  const generateCard = () => `<style>
  .card {
    user-select: none;
    width: 300px;
    height: 105px;
    background-color: #111214;
    border-radius: 10px;
    font: 14px sans-serif;
    color: #dcddde;
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
  }
</style>
<div class="frame">
  <div class="card">
    <h5 class="card__header">PLAYING A GAME</h5>
    <div class="card__container">
      <div class="card__large-image-container">
        <img
          draggable="false"
          src="${largeImageUrl}"
          title="${largeImageText}"
        />
      </div>
      <div class="card__text-container">
        <div class="card__text-container-title" title="${appName}">
          ${appName}
        </div>
        <div class="card__text-container-details" title="${details}">
          ${details}
        </div>
        <div class="card__text-container-state" title="${state}">
          ${state}
        </div>
        <div class="card__text-container-time-elapsed">${elapsed}</div>
      </div>
    </div>
  </div>
</div>`;

  return !minify
    ? generateCard()
    : generateCard().replace(/>\s+</g, "><").replace(/\s+/g, " ");
}

/**
 * Wrap a given HTML in an SVG element so that it can be displayed in GFM (GitHub Flavored Markdown)
 * @param {string} html HTML to wrap within an SVG element
 * @returns {string} SVG-wrapped HTML
 */
function _wrapSVG({ w = 320, h = 125, html }) {
  if (!html) throw new Error("missing HTML");
  return `<svg fill="none" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">${html}</div></foreignObject></svg>`;
}

export default cardGenerator;
export { cardGenerator };
