const electron = require('electron');
const url = require('url');
const path = require('path');
const { BrowserWindow, ipcMain } = electron;
var knex = require('../db/knex');

let newCompanyWindow = null;
let companyId = null;

ipcMain.on('open-new-company', (e) => {
  createNewCompanyWindow();
});

ipcMain.on('company-edit', (e, cid) => {
  companyId = cid;
  createNewCompanyWindow();
});

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
    companyId = null;
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

ipcMain.on('company-update', (e, formData) => {
  knex('companies').where({id: formData.id })
                   .update(formData)
                   .then(() => {
                     mainWindow.webContents.send('create:success', "Succesfully Updated!");
                   });
  knex.select().table('companies').then((results) => {
    mainWindow.webContents.send('populate-companies-index', results);
  });
  newCompanyWindow.close();
});

ipcMain.on('company-delete', (e, formData) => {
  knex('companies').where({id: formData.id })
                   .del()
                   .then(() => {
                     mainWindow.webContents.send('create:success', "Succesfully Deleted!");
                   });
  knex.select().table('companies').then((results) => {
    mainWindow.webContents.send('populate-companies-index', results);
  });
  newCompanyWindow.close();
});

ipcMain.on('new-company-window-loaded', (e) => {
  if(companyId) {
    knex('companies').where({ id: companyId })
                     .first()
                     .then((result) => {
                        companyId = null;
                        newCompanyWindow.webContents.send('company-edit-data', result);
                      });
  }
});
