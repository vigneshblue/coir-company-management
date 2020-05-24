const electron = require('electron');
const { BrowserWindow, ipcMain } = electron;
var knex = require('../db/knex');

ipcMain.on('sales-bill-create', (e, formData) => {
  knex('sales_bill').insert(formData)
  .then(() => {
    e.sender.send('create:success', "Succesfully saved data!");
  });
  knex.select().table('sales_bill').then((results) => {
    mainWindow.webContents.send('sales-bills', results);
  });
});

ipcMain.on("main-window-loaded", () => {
  knex.select().table('sales_bill').then((results) => {
    mainWindow.webContents.send('sales-bills', results);
  });
});