param(
  [int]$Port = 5500
)

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

if (Get-Command py -ErrorAction SilentlyContinue) {
  py -m http.server $Port
  exit $LASTEXITCODE
}

if (Get-Command python -ErrorAction SilentlyContinue) {
  python -m http.server $Port
  exit $LASTEXITCODE
}

Write-Error "Python nao foi encontrado. Instale Python ou rode a pagina com um servidor local equivalente."
