// My API (POST http://192.168.0.1:8888/streaming/CONFIG)
document.getElementById("start").onclick = function()
{

  
$.ajax({
    url: cameraUrl+"/streaming/CONFIG",
    type: "POST",
    contentType:"application/json",
    data:JSON.stringify({
        "token": token.substring(10, 22),
        "mode": "1",
        "path": ""
    })
})
.done(function(data, textStatus, jqXHR) {
    console.log("HTTP Request Succeeded: " + jqXHR.status);
    console.log(data);
    
    VideoPath = (JSON.stringify(data));
    VideoPath = VideoPath.substring(20,43);
    VideoPathWhole=cameraUrl+"/"+VideoPath;
    //var link = str.link (VideoPathWhole);
   // $('a').text('jQuery').attr('href', VideoPathWhole);
    
    document.querySelector('#greeting2').innerText =
    'HLS Stream Path is:  ' +VideoPathWhole;
    document.querySelector('#greeting3').innerHTML= '<a href= " ' + VideoPathWhole + ' "target="_blank" > See Live View</a>';
    document.querySelector('#greeting4').innerText =
    'Please Note: Browser Must Support HLS (e.g. Safari)';
    

  
    // document.querySelector('#greeting3').innerText= link;
   
    
    
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
})
.always(function() {
    /* ... */
});


// My API (POST http://192.168.0.1:8888/streaming/STREAM)

$.ajax({
    url: cameraUrl+"/streaming/STREAM",
    type: "POST",
    contentType:"application/json",
    data:JSON.stringify({
        "token": token.substring(10,22),
        "stream": "TRUE"
    })
})
.done(function(data, textStatus, jqXHR) {
    console.log("HTTP Request Succeeded: " + jqXHR.status);
    console.log(data);
    
    
    
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
})
.always(function() {
    /* ... */
});


};
