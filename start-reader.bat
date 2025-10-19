@echo off
setlocal

REM Navigate to repository root
cd /d "%~dp0"

REM Install dependencies if node_modules does not exist
if not exist "node_modules" (
  echo Installing dependencies...
  pnpm install || goto :error
)

REM Build the application
echo Building application...
pnpm build || goto :error

REM Launch preview server for the web app on all interfaces
echo Starting local preview server...
pnpm --filter web preview -- --host
goto :eof

:error
echo.
echo An error occurred. Please review the log above.
exit /b 1
