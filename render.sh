ffmpeg -y \
-i base.mp4 \
-i title.mp4 \
-filter_complex \
"[1]format=rgb24,colorkey=black:0.1:1.0,colorchannelmixer=aa=1.0[1d]; [0][1d]overlay=0:0:enable='between(t, 0, 8)'[v1]" \
-map [v1] -c:a copy -c:v libx264 -preset ultrafast bumper.mp4
