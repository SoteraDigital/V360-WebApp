This is a quick document to start explaining how any tool can convert the stacked videos output by the camera.
Our converter:
[New V.360° Video Converter Available](https://support.vsnmobil.com/hc/en-us/articles/204935265-New-V-360-Video-Converter-Available)

This is a simple java application that presents a GUI for running ffmpeg with different arguments. 
Based on the input video resolution/size and the output format selected by the user we run a few task:

* unstack the video and place side by side.
* downscale to a lower resolution
* add meta data to upload to youtube or facebook.

TODO: update later with the ffmpeg commands.
