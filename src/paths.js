import {ipcRenderer} from "electron";

export let directoryPath = '';
export let callbacks = [];
// We can communicate with main process through messages.
ipcRenderer.on("app-path", (event, paths) => {
    const {
        pathToSettingsDirectory,
    } = paths;
    directoryPath = pathToSettingsDirectory;
    if(callbacks.length !== 0){
        callbacks.forEach(cb => cb());
        callbacks = [];
    }
});
ipcRenderer.send("need-app-path");