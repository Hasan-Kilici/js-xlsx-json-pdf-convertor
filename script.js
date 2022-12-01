let selectedFile;
console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
})

let data = [{
  "name": "jayanth",
  "data": "scd",
  "abc": "sdef"
}]


document.getElementById('getJsonData').addEventListener("click", () => {
  XLSX.utils.json_to_sheet(data, 'out.xlsx');
  if (selectedFile) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      console.log(workbook);
      let allSheets = []
      workbook.SheetNames.forEach(sheet => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
        console.log(rowObject);
        allSheets.push(rowObject)
      });
      document.getElementById("jsondata").innerHTML = JSON.stringify(allSheets)
      sessionStorage.setItem('allSheets', JSON.stringify(allSheets))
      localStorage.setItem('allSheets', JSON.stringify(allSheets))
    }
  }
});

document.getElementById('getPDF').addEventListener("click", async () => {
XLSX.utils.make_json(data, 'out.xlsx');
  let list = document.getElementById("list");
  if (selectedFile) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = async (event) => {
      let data = event.target.result;
      let workbook = await XLSX.read(data, { type: "binary" });
      let Strings = await Object(workbook.Strings);
      console.log(Strings);
      for(let i = 0;i < Strings.length;i++){
        if(i==0){
          list.innerHTML += `<div class="col-2">${Strings[i].t}</div>`;
        } else {
          list.innerHTML += `<div class="col-2">${Strings[i].t}</div>`;
        }
      }
      list.innerHTML += `<div class="col-12" ><br><br><center><button class="btn btn-primary" onclick="print()">PDF OLARAK INDIR</center></div>`;
    document.title = "PDF"
    setTimeout(()=>{
      window.print();     
    },100);
    }
  }
});
