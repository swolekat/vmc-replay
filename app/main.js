/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helpers/window.js":
/*!*******************************!*\
  !*** ./src/helpers/window.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs_jetpack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs-jetpack */ "fs-jetpack");
/* harmony import */ var fs_jetpack__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_jetpack__WEBPACK_IMPORTED_MODULE_1__);
// This helper remembers the size and position of your windows, and restores
// them in that place after app relaunch.
// Can be used for more than one window, just construct many
// instances of it and give each different name.


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((name, options) => {
  const userDataDir = fs_jetpack__WEBPACK_IMPORTED_MODULE_1___default().cwd(electron__WEBPACK_IMPORTED_MODULE_0__.app.getPath("userData"));
  const stateStoreFile = `window-state-${name}.json`;
  const defaultSize = {
    width: options.width,
    height: options.height
  };
  let state = {};
  let win;

  const restore = () => {
    let restoredState = {};

    try {
      restoredState = userDataDir.read(stateStoreFile, "json");
    } catch (err) {// For some reason json can't be read (might be corrupted).
      // No worries, we have defaults.
    }

    return Object.assign({}, defaultSize, restoredState);
  };

  const getCurrentPosition = () => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1]
    };
  };

  const windowWithinBounds = (windowState, bounds) => {
    return windowState.x >= bounds.x && windowState.y >= bounds.y && windowState.x + windowState.width <= bounds.x + bounds.width && windowState.y + windowState.height <= bounds.y + bounds.height;
  };

  const resetToDefaults = () => {
    const bounds = electron__WEBPACK_IMPORTED_MODULE_0__.screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2
    });
  };

  const ensureVisibleOnSomeDisplay = windowState => {
    const visible = electron__WEBPACK_IMPORTED_MODULE_0__.screen.getAllDisplays().some(display => {
      return windowWithinBounds(windowState, display.bounds);
    });

    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults();
    }

    return windowState;
  };

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }

    userDataDir.write(stateStoreFile, state, {
      atomic: true
    });
  };

  state = ensureVisibleOnSomeDisplay(restore());
  win = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow(Object.assign({}, options, state));
  win.on("close", saveState);
  return win;
});

/***/ }),

/***/ "./src/menu/app_menu_template.js":
/*!***************************************!*\
  !*** ./src/menu/app_menu_template.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  label: "App",
  submenu: [{
    label: "Quit",
    accelerator: "CmdOrCtrl+Q",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.app.quit();
    }
  }]
});

/***/ }),

/***/ "./src/menu/dev_menu_template.js":
/*!***************************************!*\
  !*** ./src/menu/dev_menu_template.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  label: "Development",
  submenu: [{
    label: "Reload",
    accelerator: "CmdOrCtrl+R",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
    }
  }, {
    label: "Toggle DevTools",
    accelerator: "Alt+CmdOrCtrl+I",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().toggleDevTools();
    }
  }]
});

/***/ }),

/***/ "./src/menu/edit_menu_template.js":
/*!****************************************!*\
  !*** ./src/menu/edit_menu_template.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  label: "Edit",
  submenu: [{
    label: "Undo",
    accelerator: "CmdOrCtrl+Z",
    selector: "undo:"
  }, {
    label: "Redo",
    accelerator: "Shift+CmdOrCtrl+Z",
    selector: "redo:"
  }, {
    type: "separator"
  }, {
    label: "Cut",
    accelerator: "CmdOrCtrl+X",
    selector: "cut:"
  }, {
    label: "Copy",
    accelerator: "CmdOrCtrl+C",
    selector: "copy:"
  }, {
    label: "Paste",
    accelerator: "CmdOrCtrl+V",
    selector: "paste:"
  }, {
    label: "Select All",
    accelerator: "CmdOrCtrl+A",
    selector: "selectAll:"
  }]
});

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

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "./config/env_development.json":
/*!*************************************!*\
  !*** ./config/env_development.json ***!
  \*************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"development","description":"Add here any environment specific stuff you like."}');

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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _menu_app_menu_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu/app_menu_template */ "./src/menu/app_menu_template.js");
/* harmony import */ var _menu_edit_menu_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu/edit_menu_template */ "./src/menu/edit_menu_template.js");
/* harmony import */ var _menu_dev_menu_template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./menu/dev_menu_template */ "./src/menu/dev_menu_template.js");
/* harmony import */ var _helpers_window__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers/window */ "./src/helpers/window.js");
/* harmony import */ var env__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! env */ "./config/env_development.json");
// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.






 // Special module holding environment variables which you declared
// in config/env_xxx.json file.


const PATH_TO_SETTINGS_DIRECTORY = path__WEBPACK_IMPORTED_MODULE_0___default().join(process.env.APPDATA, '../LocalLow/swolekat/vmc-replay/'); // Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.

if (env__WEBPACK_IMPORTED_MODULE_7__.name !== "production") {
  const userDataPath = electron__WEBPACK_IMPORTED_MODULE_2__.app.getPath("userData");
  electron__WEBPACK_IMPORTED_MODULE_2__.app.setPath("userData", `${userDataPath} (${env__WEBPACK_IMPORTED_MODULE_7__.name})`);
}

const setApplicationMenu = () => {
  const menus = [_menu_app_menu_template__WEBPACK_IMPORTED_MODULE_3__["default"], _menu_edit_menu_template__WEBPACK_IMPORTED_MODULE_4__["default"]];

  if (env__WEBPACK_IMPORTED_MODULE_7__.name !== "production") {
    menus.push(_menu_dev_menu_template__WEBPACK_IMPORTED_MODULE_5__["default"]);
  }

  electron__WEBPACK_IMPORTED_MODULE_2__.Menu.setApplicationMenu(electron__WEBPACK_IMPORTED_MODULE_2__.Menu.buildFromTemplate(menus));
}; // We can communicate with our window (the renderer process) via messages.


const initIpc = () => {
  electron__WEBPACK_IMPORTED_MODULE_2__.ipcMain.on("need-app-path", (event, arg) => {
    event.reply("app-path", {
      pathToSettingsDirectory: PATH_TO_SETTINGS_DIRECTORY
    });
  });
  electron__WEBPACK_IMPORTED_MODULE_2__.ipcMain.on("need-app-path", (event, arg) => {
    event.reply("app-path", {
      pathToSettingsDirectory: PATH_TO_SETTINGS_DIRECTORY
    });
  });
};

electron__WEBPACK_IMPORTED_MODULE_2__.app.on("ready", () => {
  setApplicationMenu();
  initIpc();
  const mainWindow = (0,_helpers_window__WEBPACK_IMPORTED_MODULE_6__["default"])("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      // Two properties below are here for demo purposes, and are
      // security hazard. Make sure you know what you're doing
      // in your production app.
      nodeIntegration: true,
      contextIsolation: false,
      // Spectron needs access to remote module
      enableRemoteModule: env__WEBPACK_IMPORTED_MODULE_7__.name === "test"
    }
  });
  mainWindow.loadURL(url__WEBPACK_IMPORTED_MODULE_1___default().format({
    pathname: path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, "app.html"),
    protocol: "file:",
    slashes: true
  }));

  if (env__WEBPACK_IMPORTED_MODULE_7__.name === "development") {
    mainWindow.openDevTools();
  }
});
electron__WEBPACK_IMPORTED_MODULE_2__.app.on("window-all-closed", () => {
  electron__WEBPACK_IMPORTED_MODULE_2__.app.quit();
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map