@echo off
setlocal
cd /d "%~dp0"
title Generar voces de Rescate del millar con ElevenLabs

echo =====================================================
echo   RESCATE DEL MILLAR - GENERADOR DE VOCES
echo =====================================================
echo.
echo Usa la variable ELEVENLABS_API_KEY si existe; si no, pedira una clave.
echo La clave no se mostrara ni se guardara en el proyecto.
echo.

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0generar_voces.ps1" %*
set "RESULTADO=%ERRORLEVEL%"

echo.
if not "%RESULTADO%"=="0" (
  echo ERROR: no se generaron todos los audios.
  echo Revisa el mensaje anterior para conocer la causa.
) else (
  echo PROCESO COMPLETADO.
  echo Ya puedes abrir el juego: ahora suena con la voz de Alejandro Ballesteros.
)
echo.
pause
exit /b %RESULTADO%
