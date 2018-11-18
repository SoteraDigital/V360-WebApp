

window.setTimeout (function() {
  document.querySelector('#greeting').innerText =
    'Session Token is ' + token;

window.setInterval(function(){
$.ajax({
    url: cameraUrl+"/operation/HTBEAT",
    type: "POST",
    contentType:"application/json",
    data:token
})
.done(function(data, textStatus, jqXHR) {
    console.log("HTTP Request Succeeded: " + jqXHR.status);
    console.log(data);

   
    
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
})
.always(function() {
  console.log("HTTP Request always");
  
});
    /* ... */
}, 1000);
  
  
}, 1500);
