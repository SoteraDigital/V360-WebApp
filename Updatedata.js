document.getElementById("datachange").onclick = function()
{
  CameraWeb=document.getElementById("webaddress").value;
  pin=document.getElementById("camerapin").value;
  cameraUrl = protocol+CameraWeb+":"+ServerPort
  console.log("saved new camera url: "+cameraUrl);
  console.log(pin);
};
var greeting1 = document.querySelector('#greeting1');
var bluetoothDaugtherBoardDevice;
function log(msg)
{
	var node = document.createElement("li");                 // Create a <li> node
	var textnode = document.createTextNode(msg);         // Create a text node
	node.appendChild(textnode);                              // Append the text to <li>
	greeting1.appendChild(node); 
}
function handleNotifications(event) {
  let value = event.target.value;
  let a = [];
  // Convert raw data bytes to hex values just for the sake of showing something.
  // In the "real" world, you'd use data.getUint8, data.getUint16 or even
  // TextDecoder to process raw data bytes.
  for (let i = 0; i < value.byteLength; i++) {
    a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
  }
  log('> ' + a.join(' '));
}
var SCAM1_service_uuid = '0000ff00-0000-1000-8000-00805f9b34fb'
var SCAM2_service_uuid = 'f000ff70-0123-4000-b000-000000000000'
function onDisconnected(event)
{
	// Object event.target is Bluetooth Device getting disconnected.
	log('> Bluetooth Device disconnected');
}
document.getElementById("bluetoothCameraStartScan").onclick = async function()
{
	//try{
		bluetoothCameraStartScan = await navigator.bluetooth.requestDevice({
			//	acceptAllDevices: true
				filters: [{
					services: [0xff00]//SCAM 2 Service	
				}],
				
				optionalServices: [
					SCAM2_service_uuid,
					0xffe0,
					0x1800,
					0xfd51
				]
			
			});
			bluetoothCameraStartScan.addEventListener('gattserverdisconnected', onDisconnected);
			log("found a device:"+bluetoothCameraStartScan);
			const server = await bluetoothCameraStartScan.gatt.connect();
			//lets now get our service
			log('Getting daugtherboard services ');
			//const generic_service = await server.getPrimaryService('generic_access');
			const db_service = await server.getPrimaryService(SCAM1_service_uuid);
			//0x2 sets reverse tethering
			var usb_char = await db_service.getCharacteristic('0000ff0b-0000-1000-8000-00805f9b34fb');
			var wifi_config_char = await db_service.getCharacteristic('0000ff30-0000-1000-8000-00805f9b34fb');
		//	var ap_conf_char = await db_service.getCharacteristic('0000ff31-0000-1000-8000-00805f9b34fb	');
			var get_wifi_info = await db_service.getCharacteristic('0000ff42-0000-1000-8000-00805f9b34fb');
			// 1 byte connection type: 32 bytes ssid: 4 byte ipv4
			var WIFI_info = await db_service.getCharacteristic('0000ff79-0000-1000-8000-00805f9b34fb');
			const wifi_info_mode = await WIFI_info.readValue();
			log("WIfi info: "+wifi_info_mode);
			//subscribe for notify of pin result
			//await pin_verify_characteristic.startNotifications();
			//pin_verify_characteristic.addEventListener('characteristicvaluechanged:',handleNotifications);

			//usb
			const usb_mode = await usb_char.readValue();
			log("usb mode:"+ usb_mode);
			let user_pin = Uint8Array.of(0x02);
			await usb_char.writeValue(user_pin);
/*	}catch(e)
	{
		log(e);
	}*/
};
document.getElementById("bluetoothStartScan").onclick = async function()
{	
	try{

	
		bluetoothDaugtherBoardDevice = await navigator.bluetooth.requestDevice({
		//	acceptAllDevices: true
			filters: [{
				services: [SCAM2_service_uuid]
			}],
			
			optionalServices: [
				SCAM2_service_uuid,
				'f000ff70-0123-4000-b000-000000000000',
				0xffe0,
				0x1800,
				0xfd51
			]
		
		});
		bluetoothDaugtherBoardDevice.addEventListener('gattserverdisconnected', onDisconnected);
		log("found a device:"+bluetoothDaugtherBoardDevice);
		const server = await bluetoothDaugtherBoardDevice.gatt.connect();
		//lets now get our service
		log('Getting daugtherboard services ');
		//const generic_service = await server.getPrimaryService('generic_access');
		const db_service = await server.getPrimaryService('f000ff70-0123-4000-b000-000000000000');
		var pin_characteristic = await db_service.getCharacteristic('f000ffa1-0123-4000-b000-000000000000');
		var pin_verify_characteristic = await db_service.getCharacteristic('f000ffa2-0123-4000-b000-000000000000');
		var APPBUT_characteristic = await db_service.getCharacteristic('f000ff89-0123-4000-b000-000000000000');
		//todo read
		var WFIINFO_char = await db_service.getCharacteristic('0000ff79-0000-1000-8000-00805f9b34fb');
		//subscribe for notify of pin result
		await pin_verify_characteristic.startNotifications();
		pin_verify_characteristic.addEventListener('characteristicvaluechanged:',handleNotifications);

		//send pin	
		let user_pin = Uint8Array.of(0x30,0x30,0x30,0x30,0,0,0,0,0,0,0,0);//should be 12 lenght?
		await pin_characteristic.writeValue(user_pin);
		//power on
		let power_data = Uint8Array.of(0,1);
		await APPBUT_characteristic.writeValue(power_data);
		log("camera device should now be turning on");
		//sleep for 10 seconds?
		
	}catch(er)
	{
		log(er);
	}	
};

