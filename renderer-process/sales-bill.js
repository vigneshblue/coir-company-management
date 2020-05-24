const electron = require('electron');
const {ipcRenderer} = electron;

document.addEventListener("DOMContentLoaded", function() {
  ipcRenderer.send('main-window-loaded')
  ipcRenderer.on("sales-bills", function(e, results) {
    let resultEl = document.getElementById("sales-bill-table");
    resultEl.innerHTML = '';
    resultEl.innerHTML = "<tr><th>Id</th><th>Item Name</th><th>Batch No</th><th>Unit</th><th>Rate</th><th>Quantity</th></tr>";
    console.log(results);
    for(var i = 0; i < results.length; i++) {
      let content = "<td>" + results[i].id.toString() + "</td>";
      content += "<td>"+ results[i].item_name.toString() + "</td>";
      content += "<td>"+ results[i].batch_no.toString() + "</td>";
      content += "<td>"+ results[i].unit.toString() + "</td>";
      content += "<td>"+ results[i].rate.toString() + "</td>";
      content += "<td>"+ results[i].quantity.toString() + "</td>";
      resultEl.innerHTML += "<tr>" + content + "<tr>";          
    }
  });
});

const createForm = document.querySelector('#sales-bill-entry');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let formData = $('form').serializeArray().reduce(function(obj, item) {
      obj[item.name] = item.value;
      return obj;
  }, {});
  ipcRenderer.send('sales-bill-create', formData);
});

ipcRenderer.on('create:success', (e, msg) => {
  alert(msg);
});

document.querySelector('#sbw-create').addEventListener('click', () => { openSections('create') });

function openSections(section) {      
  switch(section) {
    case 'create':
      toggleSections('block', 'none', 'none');
      break;
    case 'update':
      toggleSections('none', 'block', 'none');
      break;
    case 'show': 
      toggleSections('none', 'none', 'block');
      break;
  }
}

function toggleSections(create, update, show) {
  let createSection = document.querySelector('#sbw-create-section');
  let updateSection = document.querySelector('#sbw-update-section');
  let showSection = document.querySelector('#sbw-show-section');
  createSection.style.display = create;
  updateSection.style.display = update;
  showSection.style.display = show;
}