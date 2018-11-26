// My API (POST http://192.168.0.1:8888/auth/login)
//connect to camera
//pin from ascii to byte/hex padded to 12 ?
//write to ffA1 30:30:30:30:00:00:00:00:00:00:00:00
//listen on ffa2 for 0x1 
//there is a call to receive the serial / mac of the bluetooth of apq
//Write to APPBUT 0xFF89 0x00 0x01 to turn on
//second device will show up
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



