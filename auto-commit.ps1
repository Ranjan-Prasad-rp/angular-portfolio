# auto-commit.ps1
# Snapshot uncommitted changes as a recovery checkpoint.
# Uses `chore(recovery):` prefix for Conventional Commits compliance.
#
# Run manually:    .\auto-commit.ps1
# Schedule via Task Scheduler: powershell.exe -File "C:\path\to\auto-commit.ps1"

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
Push-Location $ProjectRoot

try {
  $status = git status --porcelain
  if (-not $status) {
    Write-Host "Nothing to commit — working tree clean."
    exit 0
  }

  $count = ($status | Measure-Object).Length
  $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

  git add -A

  # Build a concise description from the most interesting changed paths
  $files = $status | ForEach-Object { $_ -replace '^.M? ', '' -replace '^\?\? ', '' } | Where-Object { $_ -notmatch '^dist/' }
  $scopes = $files | ForEach-Object {
    if ($_ -match '^src/app/([^/]+)') { $matches[1] }
    elseif ($_ -match '^src/([^/]+)') { $matches[1] }
    else { 'root' }
  } | Select-Object -Unique | Sort-Object
  $scopeList = ($scopes -join ', ') -replace '(.{60}).*', '$1…'

  git commit -m "chore(recovery): save working state — $scopeList ($timestamp)"
  Write-Host "Committed $count changed file(s) at $timestamp"
}
finally {
  Pop-Location
}
