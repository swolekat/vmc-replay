import jetpack from 'fs-jetpack';
import {directoryPath} from './paths';

const list = document.getElementById('replay-list');

const renderRightBar = (encodedName) => {
    return (
        `
            <div class="replay minimized">

                <div class="replay-header">
                    <div class="replay-name">
                        ${decodeURI(name)}
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
                    <input type="text" value="127.0.0.1" class="ip-input" data-name="${encodedName}">
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
                    <input type="checkbox" id="loop-checkbox-${encodedName}" data-name="${encodedName}">
                  </section>
                  
                  <button class="start-replay-button" data-name="${encodedName}">
                    Start     
                  </button>
                </div>
            </div>
        `
    );
};

const startReplay = (event) => {
    const name = event.target.attribute('data-name');
    const replayIp = document.querySelector(`.ip-input[data-name='${name}']`).value;
    const replayPort = document.querySelector(`.port-input[data-name='${name}']`).value;
};

const deleteReplay = (event) => {
    const name = event.target.attribute('data-name');
};

export const render = () => {
    list.innerHTML = '';
    const appDir = jetpack.cwd(directoryPath);
    const files = appDir.list();
    let allContent = '';
    files.forEach(file => {
        console.log(file);
        const fileName = file.replace('.json', '');
        allContent = `${allContent}${renderRightBar(fileName)}`;
    });
    list.innerHTML = allContent;
    setTimeout(() => {
        const buttons = document.getElementsByClassName('start-replay-button');
        for(let x = 0; x < buttons.length; x++){
            const button = buttons[x];
            button.addEventListener(startReplay);
        }

        const deleteButtons = document.getElementsByClassName('replay-delete');
        for(let x = 0; x < deleteButtons.length; x++){
            const deleteButton = deleteButtons[x];
            deleteButton.addEventListener(deleteReplay);
        }
    }, 0);
};