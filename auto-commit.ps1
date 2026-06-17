# auto-commit.ps1
# Snapshots uncommitted changes so work is never lost.
# Run manually:  .\auto-commit.ps1
# Or schedule via Task Scheduler to run every 30 min.

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $ProjectRoot

try {
  $status = git status --porcelain
  if (-not $status) {
    Write-Host "Nothing to commit — working tree clean."
    return
  }

  $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
  $count = ($status | Measure-Object).Length

  git add -A
  git commit -m "auto-save: $timestamp ($count files)"
  Write-Host "Committed $count changed file(s) at $timestamp"
}
finally {
  Pop-Location
}
