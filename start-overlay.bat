@echo off
title League Draft Overlay Launcher

echo Starting LCU Proxy (backend)...
start cmd /k "node lcu-proxy.js"

timeout /t 2 > nul

echo Opening overlay in browser...
start "" "file://%cd%\index.html"

echo You can now add this overlay to OBS as a Browser Source using the same file path.
pause
