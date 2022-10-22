(()=>{"use strict";var e={n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var a in r)e.o(r,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:r[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=require("path");var r=e.n(t);const a=require("url");var o=e.n(a);const l=require("electron"),n={label:"App",submenu:[{label:"Quit",accelerator:"CmdOrCtrl+Q",click:()=>{l.app.quit()}}]},i={label:"Edit",submenu:[{label:"Undo",accelerator:"CmdOrCtrl+Z",selector:"undo:"},{label:"Redo",accelerator:"Shift+CmdOrCtrl+Z",selector:"redo:"},{type:"separator"},{label:"Cut",accelerator:"CmdOrCtrl+X",selector:"cut:"},{label:"Copy",accelerator:"CmdOrCtrl+C",selector:"copy:"},{label:"Paste",accelerator:"CmdOrCtrl+V",selector:"paste:"},{label:"Select All",accelerator:"CmdOrCtrl+A",selector:"selectAll:"}]},c=require("fs-jetpack");var s=e.n(c);const p=r().join(process.env.APPDATA,"../LocalLow/swolekat/vmc-replay/");l.app.on("ready",(()=>{(()=>{const e=[n,i];l.Menu.setApplicationMenu(l.Menu.buildFromTemplate(e))})(),l.ipcMain.on("need-app-path",((e,t)=>{e.reply("app-path",{pathToSettingsDirectory:p})})),l.ipcMain.on("need-app-path",((e,t)=>{e.reply("app-path",{pathToSettingsDirectory:p})}));const e=((e,t)=>{const r=s().cwd(l.app.getPath("userData")),a=`window-state-${e}.json`,o={width:t.width,height:t.height};let n,i={};return i=(e=>{const t=l.screen.getAllDisplays().some((t=>((e,t)=>e.x>=t.x&&e.y>=t.y&&e.x+e.width<=t.x+t.width&&e.y+e.height<=t.y+t.height)(e,t.bounds)));return t?e:(()=>{const e=l.screen.getPrimaryDisplay().bounds;return Object.assign({},o,{x:(e.width-o.width)/2,y:(e.height-o.height)/2})})()})((()=>{let e={};try{e=r.read(a,"json")}catch(e){}return Object.assign({},o,e)})()),n=new l.BrowserWindow(Object.assign({},t,i)),n.on("close",(()=>{n.isMinimized()||n.isMaximized()||Object.assign(i,(()=>{const e=n.getPosition(),t=n.getSize();return{x:e[0],y:e[1],width:t[0],height:t[1]}})()),r.write(a,i,{atomic:!0})})),n})("main",{width:1e3,height:600,webPreferences:{nodeIntegration:!0,contextIsolation:!1,enableRemoteModule:!1}});e.loadURL(o().format({pathname:r().join(__dirname,"app.html"),protocol:"file:",slashes:!0}))})),l.app.on("window-all-closed",(()=>{l.app.quit()}))})();
//# sourceMappingURL=main.js.map