// My API (POST http://192.168.0.1:8888/streaming/CONFIG)
document.getElementById("start").onclick = function()
{
    updateValues();
    token = document.querySelector('#token_input').value;
    //CONFIGURE CALL  
    $.ajax({
        url: proxy_url_port+"/streaming/CONFIG",
        headers:{
            'Target-Proxy':"http://"+document.getElementById("webaddress").value
        },
        type: "POST",
        contentType:"application/json",
        data:JSON.stringify({
            "token": token,
            "mode": "1",
            "path": ""
        })
    })
    .done(function(data, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        console.log(JSON.stringify(data,null,2));
        
        VideoPath = (JSON.stringify(data));
        VideoPath = VideoPath.substring(20,43);
        VideoPathWhole="http://"+document.getElementById("webaddress").value+VideoPath;
        //var link = str.link (VideoPathWhole);
        // $('a').text('jQuery').attr('href', VideoPathWhole);
        
        document.querySelector('#greeting2').innerText = 'HLS Stream Path is:  ' +VideoPathWhole;
        document.querySelector('#greeting3').innerHTML = '<a href= " ' + VideoPathWhole + ' "target="_blank" > See Live View</a>';
        // document.querySelector('#greeting3').innerText= link;
        
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
       log("config HTTP Request Failed");
    });


    // My API (POST http://192.168.0.1:8888/streaming/STREAM)

    $.ajax({
        url: proxy_url_port+"/streaming/STREAM",
        headers:{
            'Target-Proxy':"http://"+document.getElementById("webaddress").value
        },
        type: "POST",
        contentType:"application/json",
        data:JSON.stringify({
            "token": token,
            "stream": "TRUE"
        })
    })
    .done(function(data, textStatus, jqXHR) {
        //log("HTTP Request Succeeded: " + jqXHR.status);
       log(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
       log("Stream HTTP Request Failed");
    });


};
