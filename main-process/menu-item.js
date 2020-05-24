const {Menu} = require('electron')

// Create menu template
const mainMenuTemplate = [];
// Build menu from template
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
// Insert Menu
Menu.setApplicationMenu(mainMenu);


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
    },
    {
      role: 'quit'
    }
    ]
  })
}
