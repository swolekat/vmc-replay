import dgram from 'dgram';
import jetpack from 'fs-jetpack';
import {directoryPath} from './paths';

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
    if(!name || !ip || !port){
        return;
    }
    endCaptureText.innerHTML = `Capturing <b>${name}</b> on <b>${ip}:${port}</b>`;
    startCaptureContent.style = 'display: none';
    endCaptureContent.style = 'display: block';
    error.style = 'display: none;';

    let time;
    packets = [];
    socket = dgram.createSocket('udp4');
    socket.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        socket.close();
        error.style = 'display: block;';
    });

    socket.on('message', (msg) => {
        if(!time){
            time = new Date();
        }
        const currentTime = new Date();
        const packet = {
            buffer: msg.toString('base64'),
            time: currentTime.getTime() - time.getTime(),
            };
        packets.push(packet);
    });

    socket.bind(port,ip);
};

const endCapture = () => {
    socket.close();
    const name = newCaptureNameInput.value;
    const fileName = `${encodeURI(name)}.json`;
    const appDir = jetpack.cwd(directoryPath);
    const processPackets = packets.map(({buffer, time}, index) => {
        const nextIndex = index + 1;
        let timeToNext = 0;
        if(nextIndex <= packets.length -1){
            const nextPacket = packets[nextIndex];
            timeToNext = nextPacket.time - time;
        }
        return {
            buffer,
            time,
            timeToNext
        }
    })
    appDir.write(fileName, JSON.stringify(packets));
    startCaptureContent.style = 'display: block';
    endCaptureContent.style = 'display: none';
};

startCaptureButton.addEventListener('click', startCapture);
endCaptureButton.addEventListener('click', endCapture);
