//http://cameraip:port/operation/RECORD
document.getElementById("startRecord").onclick = function()
{
    var config_data = {
        "record": true
    };
    sendRecordRequest(config_data);
};
document.getElementById("stopRecord").onclick = function()
{
    var config_data = {
        "record": false
    };
    sendRecordRequest(config_data);
};
function sendRecordRequest(arg_data)
{
    updateValues();
    token = document.querySelector('#token_input').value;
    var merged = Object.assign({},arg_data,{"token":token})
    $.ajax({
        url: proxy_url_port+"/operation/RECORD",
        headers:{
            'Target-Proxy':"http://"+document.getElementById("webaddress").value
        },
        type: "POST",
        contentType:"application/json",
        data:JSON.stringify(merged)
    })
    .done(function(data, textStatus, jqXHR) {
        console.log("HTTP Record Request Succeeded: " + jqXHR.status);
        log("Changed Recording:" + JSON.stringify(arg_data));
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
       log("config HTTP Request Failed code:"+jqXHR.status+" Status:"+errorThrown);
    });
}
// My API (POST http://192.168.0.1:8888/streaming/CONFIG)
document.getElementById("start").onclick = function()
{
    updateValues();
    token = document.querySelector('#token_input').value;
    //CONFIGURE CALL  
    var config_data = {
        "token": token,
        "mode": "1",
        "path": ""
    };
    $.ajax({
        url: proxy_url_port+"/streaming/CONFIG",
        headers:{
            'Target-Proxy':"http://"+document.getElementById("webaddress").value
        },
        type: "POST",
        contentType:"application/json",
        data:JSON.stringify(config_data)
    })
    .done(function(data, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        VideoPath = data.m3u8;
        let VideoPathWhole="http://"+document.getElementById("webaddress").value + VideoPath;
        //var link = str.link (VideoPathWhole);
        // $('a').text('jQuery').attr('href', VideoPathWhole);
        
        document.querySelector('#greeting2').innerText = 'HLS Stream Path is:  ' +VideoPathWhole;
        document.querySelector('#greeting3').innerHTML = '<a href= " ' + VideoPathWhole + ' "target="_blank" > See Live View</a>';
        // document.querySelector('#greeting3').innerText= link;
        
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
       log("config HTTP Request Failed code:"+jqXHR.status+" Status:"+errorThrown);
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
        log("/streaming/stream/ Request Failed code:"+jqXHR.status+" Status:"+errorThrown);
    });


};
