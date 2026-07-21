@echo off
echo ==============================================
echo Installing pannellum-react...
echo ==============================================
call npm install pannellum-react --legacy-peer-deps

echo.
echo ==============================================
echo Copying data files...
echo ==============================================
if not exist "public\data" mkdir "public\data"
copy /Y "C:\Users\pc\Desktop\new360\360_map\*.json" "public\data\"

echo.
echo ==============================================
echo Setup complete! You can now run "npm run dev"
echo ==============================================
pause
