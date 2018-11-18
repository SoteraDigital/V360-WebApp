document.getElementById("datachange").onclick = function()
{
  CameraWeb=document.getElementById("webaddress").value;
  pin=document.getElementById("camerapin").value;
  cameraUrl = protocol+CameraWeb+":"+ServerPort
  console.log("saved new camera url: "+cameraUrl);
  console.log(pin);
};

