import createWindow from "./helpers/window";
import url from "url";
import path from "path";
import env from "env";

let mainWindow;

export const init = () => {
    mainWindow = createWindow("main", {
        width: 1000,
        height: 600,
        webPreferences: {
            // Two properties below are here for demo purposes, and are
            // security hazard. Make sure you know what you're doing
            // in your production app.
            nodeIntegration: true,
            contextIsolation: false,
            // Spectron needs access to remote module
            enableRemoteModule: env.name === "test",
            backgroundThrottling: false,
        }
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "app.html"),
            protocol: "file:",
            slashes: true
        })
    );

    if (env.name === "development") {
        mainWindow.openDevTools();
    }
};

export const refresh = () => {
    mainWindow.webContents.send('re-render');
};