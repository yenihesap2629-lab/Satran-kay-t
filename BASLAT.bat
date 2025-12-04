@echo off
chcp 65001 >nul
echo ========================================
echo   Satranç Kayıt Formu - Sunucu Başlatılıyor
echo ========================================
echo.
echo Bağımlılıklar yükleniyor...
call npm install
echo.
echo ========================================
echo Sunucu başlatılıyor...
echo.
echo Tarayıcınızda şu adresi açın:
echo   Ana Sayfa: http://localhost:3000
echo.
echo Admin şifresi: satrançşahabalıevlat
echo Sağ alt köşedeki butona tıklayarak admin paneline erişebilirsiniz.
echo.
echo Sunucuyu durdurmak için Ctrl+C tuşlarına basın
echo ========================================
echo.
call npm start
pause

