const electron = require('electron');
const {ipcRenderer} = electron;

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('#uiw-new-user').addEventListener('click', () => { ipcRenderer.send('open-new-user'); });
  
});

document.addEventListener("DOMContentLoaded", function() {
  ipcRenderer.send('user-index-window-loaded')
  ipcRenderer.on("populate-users-index", function(e, results) {
    console.log(results);
    let resultEl = document.getElementById("users-index-table");
    resultEl.innerHTML = '';
    resultEl.innerHTML = "<thead class='thead-dark'><tr><th>Name</th><th>Type</th><th>Address</th><th>Phone</th><th>State</th><th>Company</th><th>Bank Name</th>"+
                          "<th>Bank Acc No</th><th>Branch Name</th><th>IFSC Code</th></tr></thead>";
    for(var i = 0; i < results.length; i++) {
      let content = "<td>"+ results[i].name.toString() + "</td>";
      content += "<td>"+ results[i].type.toString() + "</td>";
      content += "<td>"+ results[i].address.toString() + "</td>";
      content += "<td>"+ results[i].phone.toString() + "</td>";
      content += "<td>"+ results[i].state.toString() + "</td>";
      if(results[i].company_id) {
        content += "<td>"+ results[i].company_id.toString() + "</td>";
      } else { content += "<td></td>" }
      content += "<td>"+ results[i].bank_name.toString() + "</td>";
      content += "<td>"+ results[i].bank_account_no.toString() + "</td>";
      content += "<td>"+ results[i].bank_branch_name.toString() + "</td>";
      content += "<td>"+ results[i].bank_ifsc_code.toString() + "</td>";
      resultEl.innerHTML += "<tr class='user-table-index-record' data-id="+results[i].id+">" + content + "<tr>";          
    }
    document.querySelectorAll('.user-table-index-record').forEach( record => {
      record.addEventListener('click', event => {
        var userId = event.target.closest('tr').dataset.id;
        ipcRenderer.send('user-edit', userId);
      });
    })
  });
});