const electron = require('electron');
const {ipcRenderer} = electron;

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('#ciw-new-company').addEventListener('click', () => { ipcRenderer.send('open-new-company'); });
});

document.addEventListener("DOMContentLoaded", function() {
  ipcRenderer.send('company-index-window-loaded')
  ipcRenderer.on("populate-companies-index", function(e, results) {
    let resultEl = document.getElementById("company-index-table");
    resultEl.innerHTML = '';
    resultEl.innerHTML = "<thead class='thead-dark'><tr><th>Name</th><th>Address</th><th>Phone</th><th>State</th><th>GST No</th><th>Bank Name</th>"+
                          "<th>Bank Acc No</th><th>Branch Name</th><th>IFSC Code</th></tr></thead>";
    console.log(results);
    for(var i = 0; i < results.length; i++) {
      let content = "<td>"+ results[i].name.toString() + "</td>";
      content += "<td>"+ results[i].address.toString() + "</td>";
      content += "<td>"+ results[i].phone.toString() + "</td>";
      content += "<td>"+ results[i].state.toString() + "</td>";
      content += "<td>"+ results[i].gst_no.toString() + "</td>";
      content += "<td>"+ results[i].bank_name.toString() + "</td>";
      content += "<td>"+ results[i].bank_account_no.toString() + "</td>";
      content += "<td>"+ results[i].bank_branch_name.toString() + "</td>";
      content += "<td>"+ results[i].bank_ifsc_code.toString() + "</td>";
      resultEl.innerHTML += "<tr>" + content + "<tr>";          
    }
  });
});