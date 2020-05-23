const electron = require('electron');
const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = electron;

var knex = require('./db/knex');

// Set ENV
// process.env.NODE_ENV = 'production
let mainWindow;

// Listen for app to ready
app.on('ready', () => {
  // Create a new window
  mainWindow = new BrowserWindow({
      webPreferences: {
          nodeIntegration: true
      }
  });

  // Load HTML into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Quit app when closed
  mainWindow.on('closed', () => {
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert Menu
  Menu.setApplicationMenu(mainMenu);

});

// Create menu template
const mainMenuTemplate = [];

// Add developer tools item if not in prod
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
    {
      label: 'Toggle Dev Tools',
      accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
      click(item, focusedWindow){
      focusedWindow.toggleDevTools();
      }
    },
    {
      role: 'reload'
    }
    ]
  })
}