document.getElementById("datachange").onclick = function()
{
  CameraWeb=document.getElementById("webaddress").value;
  pin=document.getElementById("camerapin").value;
  cameraUrl = protocol+CameraWeb+":"+ServerPort
  console.log("saved new camera url: "+cameraUrl);
  console.log(pin);
};
document.getElementById("bluetoothStartScan").onclick = function()
{	
  
	navigator.bluetooth.requestDevice({
	  acceptAllDevices: true,
	  optionalServices: ['battery_service']
	})
	.then(device => { console.log(device)})
	.catch(error => { console.log(error); });

};

