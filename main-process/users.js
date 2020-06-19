const electron = require('electron');
const url = require('url');
const path = require('path');
const { BrowserWindow, ipcMain } = electron;
var knex = require('../db/knex');

let newUserWindow = null;
let userId = null;

ipcMain.on('open-new-user', (e) => {
  createNewUserWindow();
});

ipcMain.on('user-edit', (e, cid) => {
  userId = cid;
  createNewUserWindow();

});

function createNewUserWindow() {
  // Create a new window
  newUserWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 800,
    height: 450,
  });

  // Load HTML into window
  newUserWindow.loadURL(url.format({
    pathname: path.join(__dirname, '..', 'views', 'newUser.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Quit app when closed
  newUserWindow.on('closed', () => {
    newUserWindow = null;
    userId = null;
  });
}

ipcMain.on('user-index-window-loaded', () => {
  userIndexTableQuery();
});

ipcMain.on('new-user-add', (e, formData) => {
  knex('users').insert(formData)
  .then(() => {
    e.sender.send('create:success', "Succesfully added user!");
  });
  userIndexTableQuery();
});

ipcMain.on('user-update', (e, formData) => {
  knex('users').where({id: formData.id })
                   .update(formData)
                   .then(() => {
                     mainWindow.webContents.send('create:success', "Succesfully Updated!");
                   });
  userIndexTableQuery();
  newUserWindow.close();
});

ipcMain.on('user-delete', (e, formData) => {
  knex('users').where({id: formData.id })
                   .del()
                   .then(() => {
                     mainWindow.webContents.send('create:success', "Succesfully Deleted!");
                   });
  userIndexTableQuery();
  newUserWindow.close();
});

ipcMain.on('new-user-window-loaded', (e) => {
  knex.select('id', 'name').table('companies').then((results) => {
    newUserWindow.webContents.send('user-form-company-dropdown', results)
  });
  
  if(userId) {
    knex('users').where({ id: userId })
                     .first()
                     .then((result) => {
                        userId = null;
                        newUserWindow.webContents.send('user-edit-data', result);
                      });
  }
});

function userIndexTableQuery() {
  knex('users').leftJoin('companies', {'users.company_id': 'companies.id'})
               .select('users.id', 'users.name', 'users.type', 'users.address', 'users.phone', 'users.state', 
                 'companies.name as company_id', 'users.bank_name', 'users.bank_account_no',
                 'users.bank_branch_name', 'users.bank_ifsc_code', 'users.opening_balance').then((results) => {
                  mainWindow.webContents.send('populate-users-index', results);
                });
}