const electron = require('electron');
const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu, ipcMain, dialog } = electron;

var knex = require('./db/knex');

// Set ENV
// process.env.NODE_ENV = 'production
let loginWindow;
let mainWindow;

// Listen for app to ready
app.on('ready', () => {
  createLoginWindow();
  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert Menu
  Menu.setApplicationMenu(mainMenu);

});

// Create Login Window
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
  loginWindow.on('close', function(){
    loginWindow = null;
  });
}

ipcMain.on('login:validate', (e, login) => {
  knex('super_users').where({username: login['username'], password: login['password']})
  .then((users) => {
    if (users === undefined || users.length == 0) {
      dialog.showErrorBox('Login Failed', 'Please check the login credentials!');
    } else {
      createMainWindow();
      loginWindow.close();      
    }
  })
});

// Create Main Window
function createMainWindow() {
  // Create a new window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Load HTML into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views', 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Quit app when closed
  mainWindow.on('closed', () => {
    app.quit();
  });
}

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