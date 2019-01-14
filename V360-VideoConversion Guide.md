This is a quick document to start explaining how any tool can convert the stacked videos output by the camera.
Our converter:
[New V.360° Video Converter Available](https://support.vsnmobil.com/hc/en-us/articles/204935265-New-V-360-Video-Converter-Available)

This is a simple java application that presents a GUI for running ffmpeg with different arguments. 
Based on the input video resolution/size and the output format selected by the user we run a few task:

* unstack the video and place side by side.
* downscale to a lower resolution
* add meta data to upload to youtube or facebook.

TODO: update later with the ffmpeg commands.

# Video Convrter Commands

## Get file info command
This is used to retrieve video resolution and other properties this are needed for the commands that follow since the filters change depending on the input video resolution.

```
ffmpeg -i video_filename.mp4
```

## Capturing a frame from the video to generate a thumbnail

### If video resolution is: 3240 x 2160
```
ffmpeg -ss 00:00:5 -i video_filename.mp4 -filter_complex 'scale=300:200 [scaledDown]; [scaledDown] split [scaledDown1] [scaledDown2]; [scaledDown1] crop=300:100:0:0 [upper]; [scaledDown2] crop=300:100:0:100 [lower]; [upper] pad=600:100:0:0 [step1]; [step1][lower] overlay=300:0' -frames:v 1 -y thumbnail.jpg
```

### If video resolution is 3840 x 2160
```
ffmpeg -ss 00:00:5 -i video_filename.mp4 -filter_complex 'crop=3240:2160:300:0 [cropped]; [cropped] scale=300:200   [scaledDown]; [scaledDown] split [scaledDown1] [scaledDown2]; [scaledDown1] crop=300:100:0:0 [upper]; [scaledDown2] crop=300:100:0:100 [lower]; [upper] pad=600:100:0:0 [step1]; [step1][lower] overlay=300:0' -frames:v 1 -y thumbnail.jpg
```
### All other resolutions:
```
ffmpeg -ss 00:00:5 -i video_filename.mp4 scale=600:100 -frames:v 1 -y thumbnail.jpg
```
Invert a thumbnail
```
ffmpeg -i video_filename.mp4 -vf rotate=PI -y rotated_thumbnail.jpg
```

## Convert video to mobile friendly resolutions (1620 x 1080 or 1920 x 320)
This takes a video and reduces it to either 1620 x 1080 or 1920 x 320 depending on the input video resolution

### if the input video is 3240 x 2160
```
ffmpeg -i video_filename.mp4 -vf scale=1620:1080 -y downsized_video.mp4
```
### if the input video is 3840 x 640
```
ffmpeg -i video_filename.mp4 -vf scale=1920:320 -y downsized_video.mp4
```

## Unstacked/panoramic videos / Facebook/YouTube 2160 res output
This would be the command we use to upload to Facebook/YouTube 2160s format.

Panoramic add overlay/Background Image to existing video
This commands adds the grid to the video (source grid image is chosen based on if the video is rotated or not)

### With Grid
source image must change depending on if the video was rotated or not.
```
ffmpeg -i video_filename.mp4 -loop 1 -i v360grid1690.png -filter_complex '[1:0] [0:0] overlay=0:525:shortest=1' -y panoramic_with_background.mp4
```
### No grid just conversion
```
ffmpeg -i video_filename.mp4 -shortest -filter_complex 'pad=3840:1540:0:450' -y panoramic_with_background.mp4
```
## Rotate a video
```
ffmpeg -i video_filename.mp4 -c copy -metadata:s:v:0 rotate=180 -y output_video_filename.mp4
```
## Unstack a video to Panoramic resolution

```
ffmpeg -i video_filename.mp4 -shortest -filter_complex 'scale=1920:1280 [scaledDown]; [scaledDown] split [scaledDown1] [scaledDown2]; [scaledDown1] crop=1920:640:0:0 [upper]; [scaledDown2] crop=1920:640:0:640 [lower]; [upper] pad=3840:640:0:0 [step1]; [step1][lower] overlay=1920:0' -y unstacked_video_filename.mp4
```
## Unstack a video to Letterbox resolutions
### Facebook destination output 3840 x 1690 
```
ffmpeg -i video_filename.mp4 -shortest -filter_complex 'scale=1920:1280 [scaledDown]; [scaledDown] split [scaledDown1] [scaledDown2]; [scaledDown1] crop=1920:640:0:0 [upper]; [scaledDown2] crop=1920:640:0:640 [lower]; [upper] pad=3840:1690:0:525 [step1]; [step1][lower] overlay=1920:525' -y unstacked_video_filename.mp4
```
### 3840 x 2160 to 6480x2852 Youtube
```
ffmpeg -i video_filename.mp4 -shortest -filter_complex 'split [scaledDown1] [scaledDown2]; [scaledDown1] crop=3240:1080:300:0 [upper]; [scaledDown2] crop=3240:1080:300:1080 [lower]; [upper] pad=6480:2852:0:886 [step1]; [step1][lower] overlay=3240:886' -y unstacked_video_filename.mp4
```
### all other resolutions to 6480 x 2852
```
ffmpeg -i video_filename.mp4 -shortest -filter_complex 'scale=3240:2160 [scaleDown]; [scaleDown] split [scaledDown1] [scaledDown2]; [scaledDown1] crop=3240:1080:0:0 [upper]; [scaledDown2] crop=3240:1080:0:1080 [lower]; [upper] pad=6480:2852:0:886 [step1]; [step1][lower] overlay=3240:886' -y unstacked_video_filename.mp4
```
## Unstack To Panoramic resolutions with a background grid
if output is 2852
```
-loop -1 -i v360gridrev2852.png
```
if output is 1690 
```
-loop -1 -i v360gridrev1690.png
```
### Facebook destination 3840 x 640
```
ffmpeg -i video_filename.mp4 -loop -1 -i v360grid.png -shortest -filter_complex 'scale=1920:1280 [scaledDown]; [scaledDown] split [scaledDown1] [scaledDown2]; [scaledDown1] crop=1920:640:0:0 [upper]; [scaledDown2] crop=1920:640:0:640 [lower]; [upper] pad=3840:640:0:0 [step1]; [step1][lower] overlay=1920:0 [letterbox]; [1:0][letterbox] overlay=0:525:shortest=1' -y unstacked_video_filename.mp4
```
### 3840 x 2160 to 6480x2852 Youtube
```
ffmpeg -i video_filename.mp4 -loop -1 -i v360grid.png -shortest -filter_complex 'split [scaledDown1] [scaledDown2]; [scaledDown1] crop=3240:1080:300:0 [upper]; [scaledDown2] crop=3240:1080:300:1080 [lower]; [upper] pad=6480:1080:0:0 [step1]; [step1][lower] overlay=3240:0 [letterbox]; [1:0][letterbox] overlay=0:886:shortest=1' -y unstacked_video_filename.mp4
```
### all other resolutions to 6480x2852
```
ffmpeg -i video_filename.mp4 -loop -1 -i v360grid.png -shortest -filter_complex 'split [scaledDown1] [scaledDown2]; [scaledDown1] crop=3240:1080:0:0 [upper]; [scaledDown2] crop=3240:1080:0:1080 [lower]; [upper] pad=6480:1080:0:0 [step1]; [step1][lower] overlay=3240:0 [letterbox]; [1:0][letterbox] overlay=0:886:shortest=1' -y unstacked_video_filename.mp4
```

# Spherical Metadata

This adds spherical metadata needed for the video to show on Facebook and YouTube as 360 video.
https://github.com/google/spatial-media/releases
