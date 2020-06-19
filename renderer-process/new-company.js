const electron = require('electron');
const {ipcRenderer} = electron;
var form = document.getElementById('new-company-add');

document.addEventListener("DOMContentLoaded", function() {
  ipcRenderer.send('new-company-window-loaded');
  const createForm = document.querySelector('#new-company-add');
  createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = $('form#new-company-add').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    if(form.dataset.id) {
      formData['id'] = form.dataset.id;
      ipcRenderer.send('company-update', formData);
    } else {
      ipcRenderer.send('new-company-add', formData);
    }
  });
  
  // Delete
  document.querySelector('#ncw-delete').addEventListener('click', (e) => {
    e.preventDefault();
    ipcRenderer.send('company-delete', { id: form.dataset.id });
  });
});

ipcRenderer.on('company-edit-data', (e, company) => {
  for(var key in company) {
    var input = document.getElementById(key)
    if(input) {
      input.value = company[key];
    }
  }
  form.dataset.id = company.id;
  document.getElementById('new-company-add-btn').textContent = 'Update'
});

ipcRenderer.on('create:success', (e, msg) => {
  form.reset();
  $.notify(msg, { type: 'success' });
});