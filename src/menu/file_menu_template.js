import {shell, dialog} from "electron";
import path from "path";
import fs from "fs";
import {refresh} from '../main-window';

const PATH_TO_SETTINGS_DIRECTORY = path.join(process.env.APPDATA, '../LocalLow/swolekat/vmc-replay/');

export default {
  label: "File",
  submenu: [
    { label: "Open Saved File Location",
      click: () => {
        shell.openPath(PATH_TO_SETTINGS_DIRECTORY);
      }
    },
    { type: "separator" },
    { label: "Load from File",
      click: () => {
        dialog.showOpenDialog({
          filters: [
            { name: 'JSON Files', extensions: ['json']}
          ],
          properties: ['openFile', 'multiSelections']
        }).then(({canceled, filePaths}) => {
          if(canceled){
            return;
          }
          console.log(PATH_TO_SETTINGS_DIRECTORY);
          console.log(filePaths.join(', '));
          filePaths.forEach(path => {
            const fileContents = fs.readFileSync(path);
            const fileNameParts = path.split('\\');
            const fileName = fileNameParts[fileNameParts.length -1];
            fs.writeFileSync(`${PATH_TO_SETTINGS_DIRECTORY}\\${fileName}`, fileContents);
          });
          refresh();
        });
      }
    },
  ]
};
