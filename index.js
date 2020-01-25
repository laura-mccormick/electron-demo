const { ipcRenderer } = require("electron");

const whatIsElectron =
    `<h2>Electron is...</h2>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">an open source library for building desktop apps using front-end technologies
        </li>
        <li class="list-group-item">created and maintained by GitHub</li>
        <li class="list-group-item">used to build Atom, VSCode, Slack, Discord, etc.</li>
    </ul>`;

const benefits = 
    `<h2>Benefits</h2>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Familiar technologies can be used to create and debug an app that:</li>
        <li class="list-group-item" style="padding-left: 50px">doesn't rely on an internet connection</li>
        <li class="list-group-item" style="padding-left: 50px">doesn't need to be hosted independently</li>
        <li class="list-group-item" style="padding-left: 50px">can interact more with the OS, for example...</li>
        <li class="list-group-item" style="padding-left: 100px"><button class="btn btn-dark" onclick="showNotification()" id="notificationButton">notifications</button></li>        
        <li class="list-group-item" style="padding-left: 100px">interacting with other windows (Pennywise)</li>
        <li class="list-group-item" style="padding-left: 100px">desktop widgets (Pixel Weather)</li>
    </ul>`;

const drawbacks = 
    `<h2>Drawbacks</h2>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Chromium is a heavy technology</li>
        <li class="list-group-item">Introduces new security concerns</li>
    </ul>`;

ipcRenderer.on('send-message-to-main', function (e, message) {
    const ul = document.getElementById('messageInbox');
    const li = document.createElement('li');
    li.className = 'message';
    const messageText = document.createTextNode(message);

    li.appendChild(messageText);
    ul.appendChild(li);
});


document.getElementById("whatIsElectronButton").onclick = () => {
    document.getElementById("secondPanel").innerHTML = whatIsElectron;
};

document.getElementById("howDoesItWorkButton").onclick = () => {
    document.getElementById("secondPanel").innerHTML = `<h2>Messages from Renderer: </h2><ul id='messageInbox'></ul>`;
    ipcRenderer.send("how-does-it-work");
};

document.getElementById("benefitsButton").onclick = () => {
    document.getElementById("secondPanel").innerHTML = benefits;
};

document.getElementById("drawbacksButton").onclick = () => {
    document.getElementById("secondPanel").innerHTML = drawbacks;
};

function showNotification(){
    const notificationObject = {
        title: 'This is a notification',
        body: 'It can say whatever you want!'
    }
    const notification = new Notification(notificationObject.title, notificationObject );
}