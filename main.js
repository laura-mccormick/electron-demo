const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const url = require('url');

let mainWindow, whatIsElectronWindow, howDoesItWorkWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('./html/index.html')

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
        height: 300,
        title: 'What Is Electron?'
      });
      whatIsElectronWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'html/whatIsElectron.html'),
        protocol: 'file:',
        slashes: true
      }));
      // Handle garbage collection
      whatIsElectronWindow.on('close', function () {
        whatIsElectronWindow = null;
      });
    }
  });

  ipcMain.on("how-does-it-work", () => {
    if (!howDoesItWorkWindow) {
      howDoesItWorkWindow = new BrowserWindow({
        width: 500,
        height: 600,
        title: 'How Does It Work?',
        webPreferences: {
          nodeIntegration: true
        }
      });
      howDoesItWorkWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'html/howDoesItWork.html'),
        protocol: 'file:',
        slashes: true
      }));
      // Handle garbage collection
      howDoesItWorkWindow.on('close', function () {
        whatIsElectronWindow = null;
      });
    }
  });

  ipcMain.on("send-message-to-main", function(e, message){
    mainWindow.webContents.send('send-message-to-main', message);
  });
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
  app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})