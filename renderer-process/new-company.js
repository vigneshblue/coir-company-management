const electron = require('electron');
const {ipcRenderer} = electron;

document.addEventListener("DOMContentLoaded", function() {
  const createForm = document.querySelector('#new-company-add');
  createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = $('form#new-company-add').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    ipcRenderer.send('new-company-add', formData);
  });
});

ipcRenderer.on('create:success', (e, msg) => {
  document.getElementById('new-company-add').reset();
  $.notify(msg, { type: 'success' });
});