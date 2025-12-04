const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'registrations.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Kayıtları dosyadan oku
async function readRegistrations() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Dosya yoksa boş array döndür
        return [];
    }
}

// Kayıtları dosyaya yaz
async function writeRegistrations(registrations) {
    await fs.writeFile(DATA_FILE, JSON.stringify(registrations, null, 2), 'utf8');
}

// Kayıt oluşturma endpoint'i
app.post('/api/register', async (req, res) => {
    try {
        const registration = req.body;
        
        // Validasyon
        if (!registration.firstName || !registration.lastName || 
            !registration.className || !registration.phone) {
            return res.status(400).json({ error: 'Tüm alanlar doldurulmalıdır.' });
        }
        
        registration.timestamp = new Date().toISOString();
        registration.id = Date.now().toString();
        
        const registrations = await readRegistrations();
        registrations.push(registration);
        await writeRegistrations(registrations);
        
        res.json({ success: true, message: 'Kayıt başarıyla oluşturuldu.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Kayıt sırasında bir hata oluştu.' });
    }
});

// Kayıtları listeleme endpoint'i
app.get('/api/registrations', async (req, res) => {
    try {
        const registrations = await readRegistrations();
        res.json(registrations);
    } catch (error) {
        console.error('Error reading registrations:', error);
        res.status(500).json({ error: 'Kayıtlar okunurken bir hata oluştu.' });
    }
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});

