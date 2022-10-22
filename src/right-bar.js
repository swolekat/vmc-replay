import jetpack from 'fs-jetpack';
import {directoryPath} from './paths';
import dgram from 'dgram';
import fs from 'fs';
import { Buffer } from 'buffer';

const list = document.getElementById('replay-list');

let activeReplays = {};

const renderRightBar = (encodedName) => {
    return (
        `
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
        `
    );
};

const processFrame = (name) => {
    if(!activeReplays[name]){
        return;
    }
    const {index, loop, ip, port, packets} = activeReplays[name];
    if(index > packets.length -1){
        const startButton = document.querySelector(`.start-replay-button[data-name='${name}']`);
        const stopButton = document.querySelector(`.stop-replay-button[data-name='${name}']`);
        stopButton.style = 'display: none;';
        startButton.style = 'display: block;';
        return;
    }
    const {buffer, timeToNext} = packets[index];
    const client = dgram.createSocket('udp4');
    const bufferObj = Buffer.from(buffer, 'base64');
    client.send(bufferObj, port, ip, (err) => {
        client.close();
    });
    activeReplays[name].index += 1;
    if(loop){
        activeReplays[name].index = activeReplays[name].index % packets.length;
    }
    setTimeout(() => processFrame(name), timeToNext);
};

const startReplay = (event) => {
    const name = event.currentTarget.getAttribute('data-name');
    const replayIp = document.querySelector(`.ip-input[data-name='${name}']`).value;
    const replayPort = document.querySelector(`.port-input[data-name='${name}']`).value;
    const loop = document.querySelector(`.loop-checkbox[data-name='${name}']`).checked;
    const fileName = `${encodeURI(name)}.json`;
    const appDir = jetpack.cwd(directoryPath);
    const fileContents = appDir.read(fileName, 'json');
    activeReplays[name] = {
        index: 0,
        loop,
        ip: replayIp,
        port: replayPort,
        packets: fileContents,
    };

    const startButton = document.querySelector(`.start-replay-button[data-name='${name}']`);
    const stopButton = document.querySelector(`.stop-replay-button[data-name='${name}']`);
    startButton.style = 'display: none;';
    stopButton.style = 'display: block;';

    processFrame(name);
};

const stopReplay = (event) => {
    const name = event.currentTarget.getAttribute('data-name');
    delete activeReplays[name];
    const startButton = document.querySelector(`.start-replay-button[data-name='${name}']`);
    const stopButton = document.querySelector(`.stop-replay-button[data-name='${name}']`);
    stopButton.style = 'display: none;';
    startButton.style = 'display: block;';
};

const deleteReplay = (event) => {
    const name = event.currentTarget.getAttribute('data-name');
    const appDir = jetpack.cwd(directoryPath);
    appDir.remove(`${name}.json`);
    render();
};

export const render = () => {
    list.innerHTML = '';
    let files = [];
    try {
        files = fs.readdirSync(directoryPath);
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
        for(let x = 0; x < buttons.length; x++){
            const button = buttons[x];
            button.addEventListener('click', startReplay);
        }

        const deleteButtons = document.getElementsByClassName('replay-delete');
        for(let x = 0; x < deleteButtons.length; x++){
            const deleteButton = deleteButtons[x];
            deleteButton.addEventListener('click', deleteReplay);
        }

        const stopButtons = document.getElementsByClassName('stop-replay-button');
        for(let x = 0; x < stopButtons.length; x++){
            const stopButton = stopButtons[x];
            stopButton.addEventListener('click', stopReplay);
        }
    }, 0);
};

render();