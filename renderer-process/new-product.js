const electron = require('electron');
const {ipcRenderer} = electron;
var form = document.getElementById('new-product-add');

document.addEventListener("DOMContentLoaded", function() {
  ipcRenderer.send('new-product-window-loaded');
  const createForm = document.querySelector('#new-product-add');
  createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = $('form#new-product-add').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    if(form.dataset.id) {
      formData['id'] = form.dataset.id;
      ipcRenderer.send('product-update', formData);
    } else {
      ipcRenderer.send('new-product-add', formData);
    }
  });
  
  // Delete
  document.querySelector('#npw-delete').addEventListener('click', (e) => {
    e.preventDefault();
    ipcRenderer.send('product-delete', { id: form.dataset.id });
  });
});

ipcRenderer.on('product-edit-data', (e, product) => {
  for(var key in product) {
    var input = document.getElementById(key)
    if(input) {
      input.value = product[key];
    }
  }
  form.dataset.id = product.id;
  document.getElementById('new-product-add-btn').textContent = 'Update'
});

ipcRenderer.on('create:success', (e, msg) => {
  form.reset();
  $.notify(msg, { type: 'success' });
});