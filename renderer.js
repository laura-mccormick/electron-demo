const { ipcRenderer } = require("electron");

document.getElementById("sendMessageToMainButton").onclick = () => {
    const message = document.getElementById("messageForMain").value;
    ipcRenderer.send("send-message-to-main", message);
};