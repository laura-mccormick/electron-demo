// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, whatIsElectronWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true

    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  const mainMenuTemplate = [];
  if (process.platform === "darwin") {
    mainMenuTemplate.unshift({ label: "" });
  }
  if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push({
      label: "Developer Tools",
      submenu: [
        {
          label: "Toggle DevTools",
          accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        },
        {
          role: "reload"
        }
      ]
    });
  }

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  ipcMain.on("what-is-electron", () => {
    if (!whatIsElectronWindow) {
      whatIsElectronWindow = new BrowserWindow({
        width: 500,
        height:300,
        title:'What Is Electron?'
      });
      whatIsElectronWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'whatIsElectron.html'),
        protocol: 'file:',
        slashes:true
      }));
      // Handle garbage collection
      whatIsElectronWindow.on('close', function(){
        whatIsElectronWindow = null;
      });
    }
  });
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
  app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})