//function for sending data in the db from the signup page

function sendData(){

      let user=document.getElementById("userName").value;

      let password=document.getElementById("password").value;
    
      var curr=new Date();
    
      var DateTime=curr.getFullYear()+"-"+curr.getMonth()+"-"+curr.getDay()+" "+ curr.getHours() + ":" 
    
      + curr.getMinutes() + ":" + curr.getSeconds();
    
      console.log(DateTime);
    
      var request={
    
        method:'POST',
        redirect:'follow',
        body: JSON.stringify({
          "Username": user,
          "UserPassword":password,
          "CreatedAt": DateTime
        }),
  
        // Adding headers to the request
    
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      };
    
      fetch("http://localhost:64658/api/User", request)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));}