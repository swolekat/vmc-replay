import "./stylesheets/main.css";

// import { ipcRenderer } from "electron";
// import jetpack from "fs-jetpack";
import './paths';
import './left-bar';

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
