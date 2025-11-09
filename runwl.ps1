# ================================
# React Native Wireless Run Script
# for Galaxy Fold3 (SM-F926N)
# ================================

# === 1️⃣ 변수 설정 ===
$IP = "192.168.45.115"   # 📱 폴더3의 IP 주소 (Settings → Developer options → Wireless debugging)
$PORT = "5555"
$APP_ID = "com.instaapp" # 📦 package name

# === 2️⃣ ADB 초기화 ===
Write-Host "▶ Disconnecting old ADB sessions..."
adb disconnect | Out-Null

# === 3️⃣ 무선 연결 재설정 ===
Write-Host "▶ Connecting to ${IP}:${PORT} ..."
adb connect "${IP}:${PORT}"

# === 4️⃣ 연결 확인 ===
Write-Host "▶ Checking device list..."
adb devices

# === 5️⃣ Metro 서버 캐시 초기화 ===
Write-Host "▶ Starting Metro bundler (with cache reset)..."
Start-Process powershell -ArgumentList "npx react-native start --reset-cache" -WindowStyle Minimized

Start-Sleep -Seconds 8  # Metro 서버 준비 시간

# === 6️⃣ 앱 강제 종료 및 실행 ===
Write-Host "▶ Forcing stop on $APP_ID ..."
adb shell am force-stop $APP_ID

Write-Host "▶ Building & launching app..."
npx react-native run-android

# === 7️⃣ 로그 보기 ===
Write-Host "▶ Attaching logcat..."
npx react-native log-android
