/******/ (() => { // webpackBootstrap
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const run = async () => {
  try {
    console.log("hey");
  } catch (error) {
    core.setFailed(error.message);
  }
};

if (require.main === require.cache[eval('__filename')]) {
  run();
}

module.exports = __webpack_exports__;
/******/ })()
;