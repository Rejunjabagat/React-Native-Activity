# Runs the React Native app on the Android emulator, safely.
#
#   powershell -ExecutionPolicy Bypass -File .\run-app.ps1
#
# Why this script exists: this laptop has 9.9 GB RAM. The emulator needs
# ~3 GB, so if Chrome / WPS / ChatGPT are all open Android's System UI
# starts ANR-ing ("System UI isn't responding") and the app looks broken.

$ErrorActionPreference = 'Stop'
$sdk = 'D:\Users\jabag\AppData\Local\Android\Sdk'
$avd = 'rn_pixel'
$appId = 'com.myapp'
$project = 'D:\Projects\MyApp'

$env:ANDROID_HOME = $sdk
$env:ANDROID_AVD_HOME = 'D:\caches\avd'
$env:GRADLE_USER_HOME = 'D:\caches\gradle'
$env:JAVA_HOME = 'C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot'

function FreeGB { [math]::Round((Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory / 1MB, 1) }
function MetroUp {
    try {
        $r = Invoke-WebRequest 'http://127.0.0.1:8081/status' -UseBasicParsing -TimeoutSec 3
        $b = if ($r.Content -is [byte[]]) { [Text.Encoding]::UTF8.GetString($r.Content) } else { $r.Content }
        return ($b -match 'running')
    } catch { return $false }
}

# --- 1. memory guard -------------------------------------------------------
$free = FreeGB
Write-Host "Free RAM: $free GB"
if ($free -lt 2.5) {
    Write-Host ""
    Write-Host "  Not enough RAM to run the emulator comfortably." -ForegroundColor Yellow
    Write-Host "  Close some of these and try again:" -ForegroundColor Yellow
    Get-Process | Group-Object ProcessName |
        ForEach-Object { [pscustomobject]@{ App = $_.Name; MB = [math]::Round((($_.Group | Measure-Object WorkingSet64 -Sum).Sum) / 1MB) } } |
        Sort-Object MB -Descending | Select-Object -First 6 | Format-Table -AutoSize
    Write-Host "  Tip: a real phone over USB needs almost no RAM." -ForegroundColor Yellow
    return
}

# --- 2. emulator -----------------------------------------------------------
$device = adb devices | Select-String 'emulator-\d+\s+device'
if (-not $device) {
    Write-Host "Starting emulator $avd ..."
    Start-Process -FilePath "$sdk\emulator\emulator.exe" `
        -ArgumentList '-avd', $avd, '-no-boot-anim', '-gpu', 'angle_indirect', '-memory', '2048', '-cores', '2' `
        -RedirectStandardOutput 'D:\temp\opencode\emu-out.log' `
        -RedirectStandardError 'D:\temp\opencode\emu-err.log' -WindowStyle Minimized

    $deadline = (Get-Date).AddMinutes(6)
    while ((Get-Date) -lt $deadline) {
        if (adb devices | Select-String 'emulator-\d+\s+device') {
            if ((adb shell getprop sys.boot_completed 2>$null).Trim() -eq '1') { break }
        }
        Start-Sleep -Seconds 6
    }
    if (-not ((adb shell getprop sys.boot_completed 2>$null).Trim() -eq '1')) {
        Write-Host "Emulator did not finish booting." -ForegroundColor Red
        return
    }
    Write-Host "Emulator booted."
    # let System UI settle, otherwise the first launch can hit an ANR dialog
    Start-Sleep -Seconds 25
}
else {
    Write-Host "Emulator already running."
}

# --- 3. Metro --------------------------------------------------------------
if (-not (MetroUp)) {
    Write-Host "Starting Metro ..."
    Start-Process -FilePath 'cmd.exe' `
        -ArgumentList '/c', "npx react-native start --port 8081 --max-workers 2 > D:\temp\opencode\metro-run.log 2>&1" `
        -WorkingDirectory $project -WindowStyle Hidden
    $deadline = (Get-Date).AddMinutes(2)
    while ((Get-Date) -lt $deadline -and -not (MetroUp)) { Start-Sleep -Seconds 4 }
}
Write-Host ("Metro: " + $(if (MetroUp) { 'running on 8081' } else { 'NOT running - check D:\temp\opencode\metro-run.log' }))

# --- 4. build + install + launch ------------------------------------------
adb reverse tcp:8081 tcp:8081 | Out-Null
Set-Location $project
Write-Host "Building and installing (incremental, ~1 min) ..."
npx react-native run-android --no-packager
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "App launched. Press r in Metro to reload, or just save a file." -ForegroundColor Green
}
