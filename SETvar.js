var token = "";
var pin = "0000";
var VideoPath = "Null";
var VideoLink = "Null";
var VideoPathWhole= "Null";
var proxyServer="localhost";
var proxy_url_port = "http://"+proxyServer+":8053";
function updateValues()
{
  pin=document.getElementById("camerapin").value;
  proxy_url_port = "http://"+proxyServer+":8053";
}


