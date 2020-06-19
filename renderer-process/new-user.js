const electron = require('electron');
const {ipcRenderer} = electron;
var form = document.getElementById('new-user-add');

document.addEventListener("DOMContentLoaded", function() {
  ipcRenderer.send('new-user-window-loaded');
  const createForm = document.querySelector('#new-user-add');
  createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = $('form#new-user-add').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    if(form.dataset.id) {
      formData['id'] = form.dataset.id;
      ipcRenderer.send('user-update', formData);
    } else {
      ipcRenderer.send('new-user-add', formData);
    }
  });
  
  // Delete
  document.querySelector('#nuw-delete').addEventListener('click', (e) => {
    e.preventDefault();
    ipcRenderer.send('user-delete', { id: form.dataset.id });
  });
});

ipcRenderer.on('user-edit-data', (e, user) => {
  for(var key in user) {
    var input = document.getElementById(key)
    if(input) {
      input.value = user[key];
    }
  }
  form.dataset.id = user.id;
  document.getElementById('new-user-add-btn').textContent = 'Update'
});

ipcRenderer.on('user-form-company-dropdown', (e, results) => {
  let resultEl = document.getElementById('company');
  resultEl.innerHTML = '';
  resultEl.innerHTML = "<option value=''>Select Company</option>";
  for(var i = 0; i < results.length; i++) {
    resultEl.innerHTML += "<option value="+results[i].id+">" + results[i].name + "</option>";          
  }
})

ipcRenderer.on('create:success', (e, msg) => {
  form.reset();
  $.notify(msg, { type: 'success' });
});