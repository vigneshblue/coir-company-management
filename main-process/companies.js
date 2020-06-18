const electron = require('electron');
const url = require('url');
const path = require('path');
const { BrowserWindow, ipcMain } = electron;
var knex = require('../db/knex');

ipcMain.on('open-new-company', (e) => {
  createNewCompanyWindow();
});

// new Company Window
function createNewCompanyWindow() {
  // Create a new window
  newCompanyWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 800,
    height: 450,
  });

  // Load HTML into window
  newCompanyWindow.loadURL(url.format({
    pathname: path.join(__dirname, '..', 'views', 'newCompany.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Quit app when closed
  newCompanyWindow.on('closed', () => {
    newCompanyWindow = null;
  });
}

ipcMain.on('company-index-window-loaded', (e, formData) => {
  knex.select().table('companies').then((results) => {
    mainWindow.webContents.send('populate-companies-index', results);
  });
});

ipcMain.on('new-company-add', (e, formData) => {
  knex('companies').insert(formData)
  .then(() => {
    e.sender.send('create:success', "Succesfully added company!");
  });
  knex.select().table('companies').then((results) => {
    mainWindow.webContents.send('populate-companies-index', results);
  });
});