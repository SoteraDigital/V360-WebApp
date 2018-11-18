// My API (POST http://192.168.0.1:8888/auth/login)
document.getElementById("login").onclick = function()
{
  
  document.querySelector('#greeting1').innerText =
    'Trying to connect....'; 
  document.querySelector('#greeting2').innerText =
    '  '; 
  document.querySelector('#greeting3').innerText =
    '   '; 
  document.querySelector('#greeting4').innerText =
    '    '; 
$.ajax({
    url: cameraUrl+"/auth/login",
    type: "POST",
    contentType:"application/json",
    data:JSON.stringify({
        "psw": pin
    })
})
.done(function(data, textStatus, jqXHR) {
    console.log("HTTP Request Succeeded: " + jqXHR.status);
    console.log(data);
    token = (JSON.stringify(data));
document.querySelector('#greeting1').innerText =
    'Connection Success!  '+token; 
    
    
    
    window.setTimeout (function() {
  

window.setInterval(function(){
$.ajax({
    url: cameraUrl+"/operation/HTBEAT",
    type: "POST",
    contentType:"application/json",
    data:token
})
.done(function(data, textStatus, jqXHR) {
	
    console.log("HTTP HTBEAT Request Succeeded: " + jqXHR.status);
    console.log(data);

   
    
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
})
.always(function() {
  console.log("HTTP Request always");
  
});
    /* ... */
}, 500);
  
  
}, 1000);

    
    
    
    
    
    
    
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
    console.log(CameraWeb);
   document.querySelector('#greeting1').innerText =
    'Connection Failed, Plase Make Sure Computer is on Camera WiFi and Try Again'; 
   
})
.always(function() {
  console.log("HTTP Request always");
    /* ... */
});

};



