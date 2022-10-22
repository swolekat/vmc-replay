/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/left-bar.js":
/*!*************************!*\
  !*** ./src/left-bar.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dgram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dgram */ "dgram");
/* harmony import */ var dgram__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dgram__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs_jetpack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs-jetpack */ "fs-jetpack");
/* harmony import */ var fs_jetpack__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_jetpack__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./paths */ "./src/paths.js");
/* harmony import */ var _right_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./right-bar */ "./src/right-bar.js");




const startCaptureContent = document.getElementById('start-capture-content');
const endCaptureContent = document.getElementById('end-capture-content');
const newCaptureNameInput = document.getElementById('new-capture-name');
const newCaptureIpInput = document.getElementById('new-capture-ip');
const newCapturePortInput = document.getElementById('new-capture-port');
const startCaptureButton = document.getElementById('start-capture-button');
const endCaptureText = document.getElementById('end-capture-text');
const endCaptureButton = document.getElementById('end-capture-button');
const error = document.getElementById('error');
let socket;
let packets = [];

const startCapture = () => {
  const name = newCaptureNameInput.value;
  const ip = newCaptureIpInput.value || '127.0.0.1';
  const port = newCapturePortInput.value || '39539';

  if (!name || !ip || !port) {
    return;
  }

  endCaptureText.innerHTML = `Capturing <b>${name}</b> on <b>${ip}:${port}</b>`;
  startCaptureContent.style = 'display: none';
  endCaptureContent.style = 'display: block';
  error.style = 'display: none;';
  let time;
  packets = [];
  socket = dgram__WEBPACK_IMPORTED_MODULE_0___default().createSocket('udp4');
  socket.on('listening', () => {
    const address = socket.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });
  socket.on('error', err => {
    console.log(`server error:\n${err.stack}`);
    socket.close();
    error.style = 'display: block;';
    startCaptureContent.style = 'display: block';
    endCaptureContent.style = 'display: none';
  });
  socket.on('message', msg => {
    if (!time) {
      time = new Date();
    }

    const currentTime = new Date();
    const packet = {
      buffer: msg.toString('base64'),
      time: currentTime.getTime() - time.getTime()
    };
    packets.push(packet);
  });
  socket.bind(port, ip);
};

const endCapture = () => {
  socket.close();
  const name = newCaptureNameInput.value;
  const fileName = `${encodeURI(name)}.json`;
  const appDir = fs_jetpack__WEBPACK_IMPORTED_MODULE_1___default().cwd(_paths__WEBPACK_IMPORTED_MODULE_2__.directoryPath);
  const processedPackets = packets.map(({
    buffer,
    time
  }, index) => {
    const nextIndex = index + 1;
    let timeToNext = 0;

    if (nextIndex <= packets.length - 1) {
      const nextPacket = packets[nextIndex];
      timeToNext = nextPacket.time - time;
    }

    return {
      buffer,
      time,
      timeToNext
    };
  });
  appDir.write(fileName, JSON.stringify(processedPackets, null, 2));
  startCaptureContent.style = 'display: block';
  endCaptureContent.style = 'display: none';
  (0,_right_bar__WEBPACK_IMPORTED_MODULE_3__.render)();
};

startCaptureButton.addEventListener('click', startCapture);
endCaptureButton.addEventListener('click', endCapture);

/***/ }),

/***/ "./src/paths.js":
/*!**********************!*\
  !*** ./src/paths.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "callbacks": () => (/* binding */ callbacks),
/* harmony export */   "directoryPath": () => (/* binding */ directoryPath)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

let directoryPath = '';
let callbacks = []; // We can communicate with main process through messages.

electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on("app-path", (event, paths) => {
  const {
    pathToSettingsDirectory
  } = paths;
  directoryPath = pathToSettingsDirectory;

  if (callbacks.length !== 0) {
    callbacks.forEach(cb => cb());
    callbacks = [];
  }
});
electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send("need-app-path");

/***/ }),

/***/ "./src/right-bar.js":
/*!**************************!*\
  !*** ./src/right-bar.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var fs_jetpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs-jetpack */ "fs-jetpack");
/* harmony import */ var fs_jetpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs_jetpack__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paths */ "./src/paths.js");
/* harmony import */ var dgram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dgram */ "dgram");
/* harmony import */ var dgram__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dgram__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! buffer */ "buffer");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_4__);





const list = document.getElementById('replay-list');
let activeReplays = {};

const renderRightBar = encodedName => {
  return `
            <div class="replay minimized">
                <div class="replay-header">
                    <div class="replay-name">
                        ${decodeURI(encodedName)}
                    </div>
                    <button class="replay-delete" data-name="${encodedName}">
                        DELETE
                    </button>
                </div>
                <div class="replay-controls">
                   <section>
                    <label>
                      Replay IP
                    </label>
                    <input type="text" value="127.0.0.1" class="ip-input" data-name="${encodedName}" disabled>
                  </section>
        
                  <section>
                    <label>
                      Replay Port
                    </label>
                    <input type="text" value="39539" class="port-input" data-name="${encodedName}">
                  </section>
                  
                  <section>
                    <label for="loop-checkbox-${encodedName}">
                      Loop
                    </label>
                    <input class="loop-checkbox" type="checkbox" id="loop-checkbox-${encodedName}" data-name="${encodedName}">
                  </section>
                  
                  <button class="start-replay-button" data-name="${encodedName}">
                    Start     
                  </button>
                 <button class="stop-replay-button" data-name="${encodedName}" style="display: none;">
                    Stop     
                  </button>
                </div>
            </div>
        `;
};

const processFrame = name => {
  if (!activeReplays[name]) {
    return;
  }

  const {
    index,
    loop,
    ip,
    port,
    packets
  } = activeReplays[name];

  if (index > packets.length - 1) {
    const startButton = document.querySelector(`.start-replay-button[data-name='${name}']`);
    const stopButton = document.querySelector(`.stop-replay-button[data-name='${name}']`);
    stopButton.style = 'display: none;';
    startButton.style = 'display: block;';
    return;
  }

  const {
    buffer,
    timeToNext
  } = packets[index];
  const client = dgram__WEBPACK_IMPORTED_MODULE_2___default().createSocket('udp4');
  const bufferObj = buffer__WEBPACK_IMPORTED_MODULE_4__.Buffer.from(buffer, 'base64');
  client.send(bufferObj, port, ip, err => {
    client.close();
  });
  activeReplays[name].index += 1;

  if (loop) {
    activeReplays[name].index = activeReplays[name].index % packets.length;
  }

  setTimeout(() => processFrame(name), timeToNext);
};

const startReplay = event => {
  const name = event.currentTarget.getAttribute('data-name');
  const replayIp = document.querySelector(`.ip-input[data-name='${name}']`).value;
  const replayPort = document.querySelector(`.port-input[data-name='${name}']`).value;
  const loop = document.querySelector(`.loop-checkbox[data-name='${name}']`).checked;
  const fileName = `${encodeURI(name)}.json`;
  const appDir = fs_jetpack__WEBPACK_IMPORTED_MODULE_0___default().cwd(_paths__WEBPACK_IMPORTED_MODULE_1__.directoryPath);
  const fileContents = appDir.read(fileName, 'json');
  activeReplays[name] = {
    index: 0,
    loop,
    ip: replayIp,
    port: replayPort,
    packets: fileContents
  };
  const startButton = document.querySelector(`.start-replay-button[data-name='${name}']`);
  const stopButton = document.querySelector(`.stop-replay-button[data-name='${name}']`);
  startButton.style = 'display: none;';
  stopButton.style = 'display: block;';
  processFrame(name);
};

const stopReplay = event => {
  const name = event.currentTarget.getAttribute('data-name');
  delete activeReplays[name];
  const startButton = document.querySelector(`.start-replay-button[data-name='${name}']`);
  const stopButton = document.querySelector(`.stop-replay-button[data-name='${name}']`);
  stopButton.style = 'display: none;';
  startButton.style = 'display: block;';
};

const deleteReplay = event => {
  const name = event.currentTarget.getAttribute('data-name');
  const appDir = fs_jetpack__WEBPACK_IMPORTED_MODULE_0___default().cwd(_paths__WEBPACK_IMPORTED_MODULE_1__.directoryPath);
  appDir.remove(`${name}.json`);
  render();
};

const render = () => {
  list.innerHTML = '';
  let files = [];

  try {
    files = fs__WEBPACK_IMPORTED_MODULE_3___default().readdirSync(_paths__WEBPACK_IMPORTED_MODULE_1__.directoryPath);
  } catch {
    setTimeout(() => {
      render();
    }, 0);
  }

  let allContent = '';
  files.forEach(file => {
    console.log(file);
    const fileName = file.replace('.json', '');
    allContent = `${allContent}${renderRightBar(fileName)}`;
  });
  list.innerHTML = allContent;
  setTimeout(() => {
    const buttons = document.getElementsByClassName('start-replay-button');

    for (let x = 0; x < buttons.length; x++) {
      const button = buttons[x];
      button.addEventListener('click', startReplay);
    }

    const deleteButtons = document.getElementsByClassName('replay-delete');

    for (let x = 0; x < deleteButtons.length; x++) {
      const deleteButton = deleteButtons[x];
      deleteButton.addEventListener('click', deleteReplay);
    }

    const stopButtons = document.getElementsByClassName('stop-replay-button');

    for (let x = 0; x < stopButtons.length; x++) {
      const stopButton = stopButtons[x];
      stopButton.addEventListener('click', stopReplay);
    }
  }, 0);
};
render();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/stylesheets/main.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/stylesheets/main.css ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*, *:before, *:after {\r\n  box-sizing: border-box;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  width: 100%;\r\n  height: 100%;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  font-family: sans-serif;\r\n  background: #343434;\r\n  color: #fff;\r\n  font-size: 16px;\r\n}\r\n\r\n.body {\r\n  display: flex;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.left-bar {\r\n  border-right: 1px solid #fff;\r\n  padding: 20px;\r\n  width: 300px;\r\n  height: 100%;\r\n}\r\n\r\n.error {\r\n  color: #f00;\r\n}\r\n\r\n.left-bar section {\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.left-bar section input {\r\n  display: block;\r\n  width: 100%;\r\n}\r\n\r\n.right-bar {\r\n  width: calc(100% - 301px);\r\n  height: 100%;\r\n  padding: 20px;\r\n}\r\n\r\n.replay {\r\n  margin-bottom: 20px;\r\n  background: #ff0000;\r\n  padding: 10px;\r\n  border-radius: 10px;\r\n}\r\n\r\n/*.name {*/\r\n/*  margin-bottom: 10px;*/\r\n/*}*/\r\n\r\n/*.button-row {*/\r\n/*  display: flex;*/\r\n/*}*/\r\n\r\n/*.button-row > * {*/\r\n/*  margin-right: 20px;*/\r\n/*}*/", "",{"version":3,"sources":["webpack://./src/stylesheets/main.css"],"names":[],"mappings":"AAAA;EACE,sBAAsB;AACxB;;AAEA;;EAEE,WAAW;EACX,YAAY;EACZ,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;EACnB,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,YAAY;AACd;;AAEA;EACE,4BAA4B;EAC5B,aAAa;EACb,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,WAAW;AACb;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,mBAAmB;EACnB,aAAa;EACb,mBAAmB;AACrB;;AAEA,UAAU;AACV,yBAAyB;AACzB,IAAI;;AAEJ,gBAAgB;AAChB,mBAAmB;AACnB,IAAI;;AAEJ,oBAAoB;AACpB,wBAAwB;AACxB,IAAI","sourcesContent":["*, *:before, *:after {\r\n  box-sizing: border-box;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  width: 100%;\r\n  height: 100%;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  font-family: sans-serif;\r\n  background: #343434;\r\n  color: #fff;\r\n  font-size: 16px;\r\n}\r\n\r\n.body {\r\n  display: flex;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.left-bar {\r\n  border-right: 1px solid #fff;\r\n  padding: 20px;\r\n  width: 300px;\r\n  height: 100%;\r\n}\r\n\r\n.error {\r\n  color: #f00;\r\n}\r\n\r\n.left-bar section {\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.left-bar section input {\r\n  display: block;\r\n  width: 100%;\r\n}\r\n\r\n.right-bar {\r\n  width: calc(100% - 301px);\r\n  height: 100%;\r\n  padding: 20px;\r\n}\r\n\r\n.replay {\r\n  margin-bottom: 20px;\r\n  background: #ff0000;\r\n  padding: 10px;\r\n  border-radius: 10px;\r\n}\r\n\r\n/*.name {*/\r\n/*  margin-bottom: 10px;*/\r\n/*}*/\r\n\r\n/*.button-row {*/\r\n/*  display: flex;*/\r\n/*}*/\r\n\r\n/*.button-row > * {*/\r\n/*  margin-right: 20px;*/\r\n/*}*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/stylesheets/main.css":
/*!**********************************!*\
  !*** ./src/stylesheets/main.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/stylesheets/main.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "fs-jetpack":
/*!*****************************!*\
  !*** external "fs-jetpack" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("fs-jetpack");

/***/ }),

/***/ "dgram":
/*!************************!*\
  !*** external "dgram" ***!
  \************************/
/***/ ((module) => {

module.exports = require("dgram");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylesheets_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stylesheets/main.css */ "./src/stylesheets/main.css");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paths */ "./src/paths.js");
/* harmony import */ var _left_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./left-bar */ "./src/left-bar.js");
/* harmony import */ var _right_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./right-bar */ "./src/right-bar.js");
 // import { ipcRenderer } from "electron";
// import jetpack from "fs-jetpack";



 // let appSettings = {
//   settings: [],
// };
// let settingsPaths = {};
//
// const renderSettingFromData = (data) => {
//   const {pathToSettingsDirectory, mainSettingsPath} = settingsPaths;
//   const appDir = jetpack.cwd(pathToSettingsDirectory);
//   const {name, path} = data;
//   const element = document.createElement('div');
//   element.className = 'setting-card'
//
//   const nameElement = document.createElement('div');
//   nameElement.className = 'name';
//   nameElement.innerHTML = name;
//   element.appendChild(nameElement);
//
//   const buttonRowElement = document.createElement('div');
//   buttonRowElement.className = 'button-row';
//
//
//   const loadButton = document.createElement('button');
//   loadButton.innerHTML = 'Load';
//   loadButton.addEventListener('click', () => {
//     const mySettingsContents = appDir.read(path, "utf8");
//     appDir.write(mainSettingsPath, mySettingsContents);
//   });
//   buttonRowElement.appendChild(loadButton);
//
//   const saveButton = document.createElement('button');
//   saveButton.innerHTML = 'Save';
//   saveButton.addEventListener('click', () => {
//     const currentSettingsContents = appDir.read(mainSettingsPath, "utf8");
//     appDir.write(path, currentSettingsContents);
//   });
//   buttonRowElement.appendChild(saveButton);
//
//   const deleteButton = document.createElement('button');
//   deleteButton.innerHTML = 'Delete';
//   deleteButton.addEventListener('click', () => {
//     appSettings.settings = appSettings.settings.filter(s => s.name !== name);
//     appDir.remove(path);
//     save();
//   });
//   buttonRowElement.appendChild(deleteButton);
//
//   element.appendChild(buttonRowElement);
//
//   return element;
// };
//
// const updateSettingsList = () => {
//   const settingsList = document.getElementById('settings-list');
//   settingsList.innerHTML = '';
//   appSettings.settings.forEach(data => {
//     settingsList.appendChild(renderSettingFromData(data));
//   });
// };
//
//
//
// const save = () => {
//   const {
//     pathToSettingsDirectory,
//     appSettingsPath,
//   } = settingsPaths;
//   const appDir = jetpack.cwd(pathToSettingsDirectory);
//   appDir.write(appSettingsPath, appSettings);
//   updateSettingsList();
// };
//
// document.getElementById('save-current-settings-button').addEventListener('click', () => {
//   const input = document.getElementById('new-setting-name');
//   const name = input.value;
//   if(!name){
//     return;
//   }
//   // todo better error messages
//   const hasMatchingName = appSettings.settings.find(s => s.name === name);
//   if(hasMatchingName){
//     return;
//   }
//   const {
//     pathToSettingsDirectory,
//     mainSettingsPath,
//   } = settingsPaths;
//   const appDir = jetpack.cwd(pathToSettingsDirectory);
//   const currentSettingsContents = appDir.read(mainSettingsPath, "utf8");
//   const fileName = `${encodeURI(name)}.ini`;
//   appDir.write(fileName, currentSettingsContents);
//   appSettings.settings.push({
//     name,
//     path: fileName
//   });
//   input.value = '';
//   save();
// });
//
})();

/******/ })()
;
//# sourceMappingURL=app.js.map