const electron = require('electron');
const url = require('url');
const path = require('path');
const { BrowserWindow, ipcMain, dialog, app } = electron;
var knex = require('../db/knex');
// Login Validate
ipcMain.on('login:validate', (e, login) => {
  knex('super_users').where({username: login['username'], password: login['password']})
  .then((users) => {
    if (users === undefined || users.length == 0) {
      dialog.showErrorBox('Login Failed', 'Please check the login credentials!');
    } else {
      let loginWindow = BrowserWindow.getFocusedWindow();
      createMainWindow();
      loginWindow.close();
    }
  })
});

// Main Window
function createMainWindow() {
  // Create a new window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Load HTML into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '..', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Quit app when closed
  mainWindow.on('closed', () => {
    app.quit();
  });
}