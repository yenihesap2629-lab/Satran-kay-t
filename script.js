// Satranç tahtası karelerini oluştur
function createChessBoard() {
    const boardGrid = document.querySelector('.board-grid');
    if (!boardGrid) return;
    
    // Mevcut kareleri temizle
    boardGrid.innerHTML = '';
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            const isLight = (row + col) % 2 === 0;
            square.style.backgroundColor = isLight ? '#f0d9b5' : '#b58863';
            boardGrid.appendChild(square);
        }
    }
}

// Satranç taşlarını oluştur ve hareket ettir
function createChessPieces() {
    const container = document.querySelector('.chess-pieces-container');
    if (!container) return;
    
    const pieces = ['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟'];
    
    // Satranç tahtası pozisyonunu hesapla
    const boardSize = 640;
    const boardCenterX = window.innerWidth / 2;
    const boardCenterY = window.innerHeight / 2;
    const boardStartX = boardCenterX - boardSize / 2;
    const boardStartY = boardCenterY - boardSize / 2;
    const squareSize = boardSize / 8;
    
    // 8-10 satranç taşı oluştur
    for (let i = 0; i < 10; i++) {
        const piece = document.createElement('div');
        piece.className = 'chess-piece';
        piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
        
        // Rastgele satranç tahtası karesi seç
        const row = Math.floor(Math.random() * 8);
        const col = Math.floor(Math.random() * 8);
        const x = boardStartX + (col * squareSize) + (squareSize / 2) - 40;
        const y = boardStartY + (row * squareSize) + (squareSize / 2) - 40;
        
        piece.style.left = x + 'px';
        piece.style.top = y + 'px';
        
        container.appendChild(piece);
        
        // Her taşı hareket ettir
        moveChessPiece(piece, boardStartX, boardStartY, squareSize);
    }
}

function moveChessPiece(piece, boardStartX, boardStartY, squareSize) {
    setInterval(() => {
        // Yeni rastgele satranç tahtası karesi
        const row = Math.floor(Math.random() * 8);
        const col = Math.floor(Math.random() * 8);
        const x = boardStartX + (col * squareSize) + (squareSize / 2) - 40;
        const y = boardStartY + (row * squareSize) + (squareSize / 2) - 40;
        
        piece.style.left = x + 'px';
        piece.style.top = y + 'px';
    }, 2000 + Math.random() * 1000); // 2-3 saniye arası
}

// Form gönderimi
document.addEventListener('DOMContentLoaded', () => {
    createChessBoard();
    createChessPieces();
    
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            className: document.getElementById('className').value,
            phone: document.getElementById('phone').value,
            timestamp: new Date().toISOString()
        };
        
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                form.classList.add('hidden');
                successMessage.classList.remove('hidden');
                form.reset();
            } else {
                alert('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        }
    });
    
    // Enter tuşu ile gönderim
    form.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            form.dispatchEvent(new Event('submit'));
        }
    });
    
    // Admin Modal İşlevleri
    const adminBtn = document.getElementById('adminBtn');
    const adminModal = document.getElementById('adminModal');
    const closeModal = document.querySelector('.close-modal');
    const passwordForm = document.getElementById('passwordForm');
    const passwordSection = document.getElementById('passwordSection');
    const registrationsSection = document.getElementById('registrationsSection');
    const errorMessage = document.getElementById('errorMessage');
    const ADMIN_PASSWORD = 'satrançşahabalıevlat';
    
    adminBtn.addEventListener('click', () => {
        adminModal.classList.remove('hidden');
        passwordSection.classList.remove('hidden');
        registrationsSection.classList.add('hidden');
        document.getElementById('adminPassword').value = '';
        errorMessage.classList.add('hidden');
    });
    
    closeModal.addEventListener('click', () => {
        adminModal.classList.add('hidden');
    });
    
    adminModal.addEventListener('click', (e) => {
        if (e.target === adminModal) {
            adminModal.classList.add('hidden');
        }
    });
    
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const enteredPassword = document.getElementById('adminPassword').value;
        
        if (enteredPassword === ADMIN_PASSWORD) {
            passwordSection.classList.add('hidden');
            registrationsSection.classList.remove('hidden');
            loadRegistrations();
        } else {
            errorMessage.textContent = 'Hatalı şifre!';
            errorMessage.classList.remove('hidden');
        }
    });
    
    async function loadRegistrations() {
        try {
            const response = await fetch('/api/registrations');
            const registrations = await response.json();
            
            const listContainer = document.getElementById('registrationsList');
            
            if (registrations.length === 0) {
                listContainer.innerHTML = '<div class="no-registrations">Henüz kayıt bulunmamaktadır.</div>';
                return;
            }
            
            let tableHTML = `
                <table class="registrations-table">
                    <thead>
                        <tr>
                            <th>İsim</th>
                            <th>Soyisim</th>
                            <th>Sınıf</th>
                            <th>Telefon</th>
                            <th>Kayıt Tarihi</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            registrations.forEach(reg => {
                const date = new Date(reg.timestamp);
                const formattedDate = date.toLocaleString('tr-TR');
                tableHTML += `
                    <tr>
                        <td>${reg.firstName}</td>
                        <td>${reg.lastName}</td>
                        <td>${reg.className}</td>
                        <td>${reg.phone}</td>
                        <td>${formattedDate}</td>
                    </tr>
                `;
            });
            
            tableHTML += '</tbody></table>';
            listContainer.innerHTML = tableHTML;
        } catch (error) {
            console.error('Error loading registrations:', error);
            document.getElementById('registrationsList').innerHTML = 
                '<div class="no-registrations">Kayıtlar yüklenirken bir hata oluştu.</div>';
        }
    }
});

