$ErrorActionPreference = 'Stop'
# Si ya existe la variable de entorno ELEVENLABS_API_KEY se usa; si no, se pide una clave (oculta, no se guarda).
if (-not $env:ELEVENLABS_API_KEY) {
  $secureKey = Read-Host 'Pega una clave NUEVA de ElevenLabs (no se mostrara)' -AsSecureString
  $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureKey)
  $env:ELEVENLABS_API_KEY = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
  $temporal = $true
}
try {
  & node (Join-Path $PSScriptRoot 'tools\generate_elevenlabs_audio.mjs') @args
  if ($LASTEXITCODE -ne 0) { throw 'No se pudieron generar los audios.' }
  Write-Host 'Listo. Los audios del juego quedaron guardados en assets/voz.' -ForegroundColor Green
} finally {
  if ($temporal) { $env:ELEVENLABS_API_KEY = $null }
}
