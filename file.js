var form=document.getElementById("input1");
var foldersId=sessionStorage.getItem("folderid");
var userid=sessionStorage.getItem("userid");
var curr=new Date();
function createfile() {
    try
    {
     fetch('http://localhost:64658/api/Document', {
       body: JSON.stringify({
       
        "documentName": form.value,
        "documentContentType": "text",
        "documentSize": 100,
        "documentCreatedBy": sessionStorage.getItem("userid"),
        "documentCreatedAt": curr.toISOString(),
        "documentIsDeleted": false,
          "folderId": sessionStorage.getItem("folderid"),
          
      }),
       method: 'POST',
       headers: {
        'Content-Type': 'application/json'
      },
     }).then((folderCreateResponse) => {
        console.log(folderCreateResponse);
         listFile();
     });
    }
    catch(err)
    {
      console.log(err);
    }
    } 
      function listFile() {
        try
        {
          var create = document.getElementById("create");
          create.innerHTML = '';
        fetch('http://localhost:64658/api/Document/'+sessionStorage.getItem("folderid"), {
          method: 'GET'
        })
        .then(response => response.json())
        .then((folders) => {
          console.log(folders);
          folders.forEach(folder => {
        
          var create = document.getElementById("create");
          var art = document.createElement("article");
          console.log(folder);
          const fname = folder.documentName;
          art.innerHTML = `
          <i id="file"class='bx bx-file' onclick='openfiledet(${folder.documentId},"${folder.documentName}","${folder.documentCreatedBy}","${folder.documentCreatedAt}")' style="cursor:pointer;"></i>
          <button id="filebtn" style="text-decoration: none;font-weight:bold;border: 0px; background: #e8f3ee;margin-top:30px;margin-left:100px;cursor:pointer;"> ${fname} </button>
          
          <i class="bx bx-trash" style="position: relative;left: 30px;bottom: 20px;cursor:pointer" 
          onclick ='popup(${folder.documentId})'></i >
          `
          // onclick ="deletefile(${folder.documentId})"
          ;;
          create.appendChild(art);
          });
        })
        
        }
        catch(err)
        {
          console.log(err);
        }
      }
      
  function onLoad() {
    listFile();
document.getElementById("adminName").innerHTML="Hi, "+sessionStorage.getItem("username") + "!";
  }
  
 onLoad();

 function popup(documentId) {

  Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'

  }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire(
              deletefile(documentId),
              'File deleted successfully',
              'Your file has been deleted.',
              'success'
          )

      }

  })

}

 function logout(){
  sessionStorage.clear();
  window.location.href="index.html";
}

function openfiledet(fileid,filename,createdby,createdat)
{
  alert(
  "FileId : " +fileid+ "\n"+
  "File Name :" +filename + "\n"+
  "Created By : " +createdby + "\n"+
  "Created At : " +createdat+ "\n"
  );
}


//delete folder
function deletefile(documentId) {
  var raw = "";
var requestOptions = {
  method: 'DELETE',
  body: raw,
  redirect: 'follow'
};

let deleteurl = "http://localhost:64658/api/Document/" + documentId;
fetch(deleteurl,requestOptions)
.then(response=>response.text())
.then(result => console.log(listFile()))
  .catch(error => console.log('error', error));
  location.reload();  
}

//function for searching files

function searchItem(){

  try

  {

    var search=document.getElementById("search").value;
    var create = document.getElementById("create");

    create.innerHTML = '';

  fetch(`http://localhost:64658/api/Document/${sessionStorage.getItem("folderid")}/${search}`)

  .then(response => response.json())

  .then((folders) => {

    console.log(folders);

    folders.forEach(folder => {
      var create = document.getElementById("create");
      var art = document.createElement("article");
      art.setAttribute("id","section");
      const fname = folder.documentName;
      const folderid=folder.documentId;     

      // fold.style.backgroundColor = "red";
      // console.log(fname);
      console.log(folderid);
      art.innerHTML =
      `<button id="filebtn" onclick ="createfiles(${folderid})"> ${fname} </button>`;
      create.appendChild(art);
    });
  })
  }
  catch(err)

  {
    console.log(err);
  }

}
//  upload a the file from local storage 


function uploadfile() 
{
debugger;


 
let choose = document.getElementById('input1');
  let value = choose.files[0];

var formdata = new FormData();

formdata.append("files", value);

var requestOptions = {

  method: 'POST',

  body: formdata,

  redirect: 'follow'

};



  fetch("http://localhost:64658/api/Document/upload/"+foldersId+"/"+userid+"/"+curr.toISOString(), requestOptions)

  .then(response => response.text())

  .then(result => {console.log(result)
  
  listFile()})

  .catch(error => console.log('error', error));

}
  
  

