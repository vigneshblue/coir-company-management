const electron = require('electron');
const url = require('url');
const path = require('path');
const { BrowserWindow, ipcMain } = electron;
var knex = require('../db/knex');

let newProductWindow = null;
let productId = null;

ipcMain.on('open-new-product', (e) => {
  createNewProductWindow();
});

ipcMain.on('product-edit', (e, pid) => {
  productId = pid;
  createNewProductWindow();
});

function createNewProductWindow() {
  // Create a new window
  newProductWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 800,
    height: 450,
  });

  // Load HTML into window
  newProductWindow.loadURL(url.format({
    pathname: path.join(__dirname, '..', 'views', 'newProduct.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Quit app when closed
  newProductWindow.on('closed', () => {
    newProductWindow = null;
    productId = null;
  });
}

ipcMain.on('product-index-window-loaded', (e, formData) => {
  knex.select().table('products').then((results) => {
    mainWindow.webContents.send('populate-products-index', results);
  });
});

ipcMain.on('new-product-add', (e, formData) => {
  knex('products').insert(formData)
  .then(() => {
    e.sender.send('create:success', "Succesfully added product!");
  });
  knex.select().table('products').then((results) => {
    mainWindow.webContents.send('populate-products-index', results);
  });
});

ipcMain.on('product-update', (e, formData) => {
  knex('products').where({id: formData.id })
                   .update(formData)
                   .then(() => {
                     mainWindow.webContents.send('create:success', "Succesfully Updated!");
                   });
  knex.select().table('products').then((results) => {
    mainWindow.webContents.send('populate-products-index', results);
  });
  newProductWindow.close();
});

ipcMain.on('product-delete', (e, formData) => {
  knex('products').where({id: formData.id })
                   .del()
                   .then(() => {
                     mainWindow.webContents.send('create:success', "Succesfully Deleted!");
                   });
  knex.select().table('products').then((results) => {
    mainWindow.webContents.send('populate-products-index', results);
  });
  newProductWindow.close();
});

ipcMain.on('new-product-window-loaded', (e) => {
  if(productId) {
    knex('products').where({ id: productId })
                     .first()
                     .then((result) => {
                        productId = null;
                        newProductWindow.webContents.send('product-edit-data', result);
                      });
  }
});
