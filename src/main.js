// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from "path";
import { app, Menu, ipcMain } from "electron";
import appMenuTemplate from "./menu/app_menu_template";
import fileMenuTemplate from "./menu/file_menu_template";
import devMenuTemplate from "./menu/dev_menu_template";
import fs from "fs";
import {init} from './main-window';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from "env";

const PATH_TO_SETTINGS_DIRECTORY = path.join(process.env.APPDATA, '../LocalLow/swolekat/vmc-replay/');

if(!fs.existsSync(PATH_TO_SETTINGS_DIRECTORY)){
  fs.mkdirSync(PATH_TO_SETTINGS_DIRECTORY);
}

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
  const userDataPath = app.getPath("userData");
  app.setPath("userData", `${userDataPath} (${env.name})`);
}

const setApplicationMenu = () => {
  const menus = [appMenuTemplate, fileMenuTemplate];
  if (env.name !== "production") {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// We can communicate with our window (the renderer process) via messages.
const initIpc = () => {
  ipcMain.on("need-app-path", (event, arg) => {
    event.reply("app-path", {
      pathToSettingsDirectory: PATH_TO_SETTINGS_DIRECTORY,
    });
  });
};


app.on("ready", () => {
  setApplicationMenu();
  initIpc();
  init();
});

app.on("window-all-closed", () => {
  app.quit();
});
