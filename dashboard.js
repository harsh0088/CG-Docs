const constants = {
    apiBasePath: 'http://localhost:64658/api/'
  }
 
  const form = document.getElementById("input1");
  console.log(form);
  var curr=new Date();
  function createFolders() {
    try
    {
    
     fetch(`${constants.apiBasePath}Folder`, {
       body: JSON.stringify(
      {
        "folderName": form.value,
        "folderCreatedBy" : sessionStorage.getItem("userid"),
       "folderCreatedAt":curr.toISOString(),
     "folderIsDeleted": 0
    }
      
      ),
       method: 'POST',
       headers: {
        'Content-Type': 'application/json'
      },
     }).then((folderCreateResponse) => {
        console.log(folderCreateResponse);
         listFolders();
     });
    }
    catch(err)
    {
      console.log(err);
    }
  }
  
  function listFolders() {
    try
    {
      var create = document.getElementById("create");
      create.innerHTML = '';
    fetch(`${constants.apiBasePath}Folder/`+sessionStorage.getItem("userid"), {
      method: 'GET'
    })
    .then(response => response.json())
    .then((folders) => {
      // console.log(folders);
    folders.forEach(folder => {
   
      var create = document.getElementById("create");
      var art = document.createElement("article");
      art.setAttribute("id","section");
      const fname = folder.folderName;
      const folderid=folder.folderId;
 
      // fold.style.backgroundColor = "red";
      // console.log(fname);
      console.log(folderid);
      art.innerHTML =
     `
     <i class='folder  bx bxs-folder-open' onclick='opendetails(${folder.folderId},"${folder.folderName}","${folder.folderCreatedBy}","${folder.folderCreatedAt}")'></i>
       <button id="filebtn" onclick ="createfiles(${folderid})"   style="text-decoration: none;border: 0px;margin-top:20px;margin-left:80px;font-weight:bold; background: none"> ${fname} </button>
       
       <a style= "left:20px; bottom:20px;"></a>

      <i class="bx bx-trash" onclick ='popup(${folderid})' style="position: relative;left: 5px;bottom: 55px;">

       </i>`;  
      
     
    
      create.appendChild(art);
      });
    
    })}
    catch(err)
    {
      console.log(err);
    }
  } 
  function createfiles(folderid){
 sessionStorage.setItem("folderid",folderid);
window.location.href="file.html";
  }
  
  function onLoad() {
    listFolders();
document.getElementById("adminName").innerHTML="Hi, "+sessionStorage.getItem("username") + "!";
  }
  
 onLoad();
 function popup(folderid) {

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
              deletefolder(folderid),
              'File deleted successfully',
              'Your file has been deleted.',
              'success'
          )

      }

  })

}

//  file path 


const next = document.getElementById('hello');
console.log(next);

  


// console.log(next);
function logout(){
  sessionStorage.clear();
  window.location.href="index.html";
}

function searchItem(){

  try

  {

    var search=document.getElementById("search").value;

    // console.log(search);

    var create = document.getElementById("create");

    create.innerHTML = '';

  fetch(`http://localhost:64658/api/Folder/${sessionStorage.getItem("userid")}/${search}`)

  .then(response => response.json())

  .then((folders) => {

    console.log(folders);

    folders.forEach(folder => {
      var create = document.getElementById("create");
      var art = document.createElement("article");
      art.setAttribute("id","section");
      const fname = folder.folderName;
      const folderid=folder.folderId;

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

//delete folder
function deletefolder(folder) {
  var raw = "";
var requestOptions = {
  method: 'DELETE',
  body: raw,
  redirect: 'follow'
};

let deleteurl = "http://localhost:64658/api/Folder/" + folder;
fetch(deleteurl,requestOptions)
.then(response=>response.text())
.then(result => console.log(listFolders()))
  .catch(error => console.log('error', error));
  // location.reload();  
}


function opendetails(folderid,foldername,createdby,createdat)
{
  alert(
  "FolderId : " +folderid+ "\n"+
  "Folder Name :" +foldername + "\n"+
  "Created By : " +createdby + "\n"+
  "Created At : " +createdat+ "\n"
  );
}


