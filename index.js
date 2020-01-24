const { ipcRenderer } = require("electron");

ipcRenderer.on('send-message-to-main', function (e, message) {
    const ul = document.getElementById('messageInbox');
    const li = document.createElement('li');
    li.className = 'message';
    const messageText = document.createTextNode(message);

    li.appendChild(messageText);
    ul.appendChild(li);
});


document.getElementById("whatIsElectronButton").onclick = () => {
    ipcRenderer.send("what-is-electron");
};

document.getElementById("howDoesItWorkButton").onclick = () => {
    ipcRenderer.send("how-does-it-work");
};