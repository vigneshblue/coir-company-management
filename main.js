const electron = require('electron')
const glob = require('glob')
const url = require('url')
const path = require('path')
const { app, BrowserWindow, ipcMain, dialog } = electron

// Set ENV
// process.env.NODE_ENV = 'production'
let loginWindow = null;
let mainWindow = null;

function initialize () {
  makeSingleInstance()

  loadMainProcessFiles()

  function createLoginWindow() {
    loginWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true
      },
      width: 500,
      height: 300,
      frame: false
    });
    loginWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'views','loginWindow.html'),
      protocol: 'file:',
      slashes: true
    }));
    //  Garbage collection handle
    loginWindow.on('closed', function(){
      loginWindow = null;
    });
  }

  app.on('ready', () => {
    createLoginWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (loginWindow === null) {
      createLoginWindow()
    }
  })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.

function makeSingleInstance () {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// Require each JS file in the main-process dir
function loadMainProcessFiles () {
  const files = glob.sync(path.join(__dirname, 'main-process/*.js'))
  files.forEach((file) => { require(file) })
}

initialize()






