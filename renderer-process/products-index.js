const electron = require('electron');
const {ipcRenderer} = electron;

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('#piw-new-product').addEventListener('click', () => { ipcRenderer.send('open-new-product'); });  
});

document.addEventListener("DOMContentLoaded", function() {
  ipcRenderer.send('product-index-window-loaded')
  ipcRenderer.on("populate-products-index", function(e, results) {
    let resultEl = document.getElementById("products-index-table");
    resultEl.innerHTML = '';
    resultEl.innerHTML = "<thead class='thead-dark'><tr><th>Name</th><th>Quantity</th><th>Minimum Quantity</th><th>Location</th><th>Others</th></tr></thead>";
    for(var i = 0; i < results.length; i++) {
      let content = "<td>"+ results[i].name.toString() + "</td>";
      content += "<td>"+ results[i].quantity.toString() + "</td>";
      content += "<td>"+ results[i].minimum_quantity.toString() + "</td>";
      content += "<td>"+ results[i].location.toString() + "</td>";
      content += "<td>"+ results[i].others.toString() + "</td>";
      resultEl.innerHTML += "<tr class='product-table-index-record' data-id="+results[i].id+">" + content + "<tr>";          
    }
    document.querySelectorAll('.product-table-index-record').forEach( record => {
      record.addEventListener('click', event => {
        var productId = event.target.closest('tr').dataset.id;
        ipcRenderer.send('product-edit', productId);
      });
    })
  });
});