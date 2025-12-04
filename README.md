# Satranç Turnuvası Kayıt Formu

Satranç turnuvası için kayıt formu ve admin paneli içeren web uygulaması. Gerçek satranç tahtası arka planı ve animasyonlu satranç taşları ile.

## Özellikler

- ✅ Gerçek 8x8 satranç tahtası arka planı (cebirsel notasyonlu)
- ✅ Animasyonlu satranç taşları (her 2-3 saniyede hareket eder)
- ✅ Kayıt formu (İsim, Soyisim, Sınıf, Telefon)
- ✅ Başarı mesajı gösterimi
- ✅ Sağ alt köşede admin paneli butonu
- ✅ Şifre korumalı admin paneli (modal)
- ✅ Kayıtları görüntüleme
- ✅ Siyah-beyaz-gri tonlarında modern tasarım

## Kurulum

1. Node.js'in yüklü olduğundan emin olun
2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Sunucuyu başlatın:
```bash
npm start
```

4. Tarayıcınızda şu adresi açın:
   - Ana sayfa: http://localhost:3000

## Admin Paneli

- Sağ alt köşedeki ⚙ butonuna tıklayarak admin paneline erişebilirsiniz
- Şifre: `satrançşahabalıevlat`

## Teknolojiler

- HTML5
- CSS3
- JavaScript (ES6+)
- Node.js
- Express.js

## Dosya Yapısı

```
satranc-kayit-formu/
├── index.html          # Ana sayfa (form + admin modal)
├── style.css           # Stil dosyası
├── script.js           # JavaScript kodu
├── server.js           # Express.js backend
├── package.json        # Bağımlılıklar
└── README.md          # Dokümantasyon
```

## API Endpoint'leri

### POST /api/register
Yeni kayıt oluşturur.

**Request Body:**
```json
{
  "firstName": "İsim",
  "lastName": "Soyisim",
  "className": "Sınıf",
  "phone": "Telefon"
}
```

### GET /api/registrations
Tüm kayıtları listeler.

## Lisans

ISC

