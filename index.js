const electron = require('electron')
require('electron-reload')(__dirname);

let mainWindow;

function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    title: "GRL Rooster",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.setTitle("GLR Rooster");

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

electron.app.on('ready', createWindow);
electron.app.allowRendererProcessReuse = true;