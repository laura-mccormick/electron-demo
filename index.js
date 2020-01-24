"use strict";

const { ipcRenderer } = require("electron");

document.getElementById("whatIsElectronButton").onclick = () => {
    ipcRenderer.send("what-is-electron");
};