// My API (POST http://192.168.0.1:8888/auth/login)
//connect to camera
//pin from ascii to byte/hex padded to 12 ?
//write to ffA1 30:30:30:30:00:00:00:00:00:00:00:00
//listen on ffa2 for 0x1 
//there is a call to receive the serial / mac of the bluetooth of apq
 // power on apq: APPBUT 0xFF89 0x00 0x01 (power button on)
    // wait for apq powered on -> done connect to APQ
   /* uint8_t button = 0x00;
    uint8_t on = 0x01;
    [data appendBytes:&button length:1];
    [data appendBytes:&on length:1];
//    NSData* data = [NSData dataWithBytes:&powerOn length:2];
    [self.connectedPeripheral writeValue:data forCharacteristic:self.association.camera_button type:CBCharacteristicWriteWithResponse];*/
//second device will show up
document.getElementById("login").onclick = function()
{
    updateValues();
    log('Trying to connect....'); 
    document.querySelector('#greeting2').innerText = '  '; 
    document.querySelector('#greeting3').innerText = '   '; 
    document.querySelector('#greeting4').innerText = '   '; 
  
    $.ajax({
        url: proxy_url_port+"/status/CAMINF",
        headers:{
            'Target-Proxy':"http://"+document.getElementById("webaddress").value
        },
        type: "GET",
        contentType:"application/json",
    }).done(function(data, textStatus, jqXHR) {
        log(data);
    });

    
    $.ajax({
        url: proxy_url_port+"/auth/login",
        headers:{
            'Target-Proxy':"http://"+document.getElementById("webaddress").value
        },
        type: "POST",
        contentType:"application/json",
        data:JSON.stringify({
            "psw": pin
        })
    })
    .done(function(data, textStatus, jqXHR) 
    {
        console.log("auth/login HTTP Request Succeeded: " + jqXHR.status);
        document.querySelector('#token_input').value = data.token;
        document.querySelector('#greeting1').innerText = 'Connection Success!  '+data.token; 
        startHeartbeat();
    }).fail(function(jqXHR, textStatus, errorThrown) 
    {
        log('auth/login Connection Failed, Plase Make Sure Computer is on Camera WiFi and Try Again');
    });
};
function startHeartbeat()
{
    token = document.querySelector('#token_input').value;
    window.setTimeout (function() 
    {  
       let hbeat_handle =  window.setInterval(function()
        {
            $.ajax({
                url: proxy_url_port+"/operation/HTBEAT",
                headers:{
                    'Target-Proxy':"http://"+document.getElementById("webaddress").value
                },
                type: "POST",
                contentType:"application/json",
                data:JSON.stringify({
                    "token": token
                })
            }).done(function(data, textStatus, jqXHR) 
            {
                //  console.log("HTTP HTBEAT Request Succeeded: " + jqXHR.status);
                //   console.log(data);
            }).fail(function(jqXHR, textStatus, errorThrown)
            {
                if(jqXHR.status == 401)
                {
                    log("Token is invalid login again. token used:"+token);
                    window.clearInterval(hbeat_handle);
                }else{
                    log("HTTP HTBEAT Request Failed");
                }
            });
        }, 500);
    
    }, 1000);
}


