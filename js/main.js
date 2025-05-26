/**
 * Güncel Haberler Sitesi - Ana JavaScript Dosyası
 * Bu dosya, sitenin tüm sayfalarında kullanılan ortak JavaScript işlevlerini içerir.
 */

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü işlevselliği
    setupMobileMenu();
    
    // Haber kartları için hover efektleri
    setupHoverEffects();
    
    // Yukarı çık butonu işlevselliği
    setupScrollToTop();
    
    // Sayfa geçişleri için animasyon
    setupPageTransitions();
    
    // Haber detay sayfasına yönlendirme
    setupNewsDetailRedirect();
    
    // İletişim formu doğrulama (sadece iletişim sayfasında)
    if (document.querySelector('#iletisim-formu')) {
        setupContactFormValidation();
    }
    
    // Haber arama işlevselliği
    setupSearchFunctionality();
    
    // Son dakika haberleri için yanıp sönen efekt
    setupBlinkingEffect();
    
    // Haber kartları için tıklama efekti
    setupClickEffect();
});

/**
 * Mobil menü işlevselliği
 */
function setupMobileMenu() {
    // Mobil menü butonu oluştur
    const header = document.querySelector('header .container');
    const nav = document.querySelector('header nav');
    
    if (!header || !nav) return;
    
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobil-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    header.insertBefore(mobileMenuBtn, nav);
    
    // Mobil menü CSS sınıfları ekle
    nav.classList.add('desktop-menu');
    
    // Mobil menü stil ekle
    if (!document.querySelector('style[data-for="mobil-menu"]')) {
        const style = document.createElement('style');
        style.setAttribute('data-for', 'mobil-menu');
        style.textContent = `
            .mobil-menu-btn {
                display: none;
                font-size: 24px;
                cursor: pointer;
                margin-bottom: 15px;
            }
            
            @media (max-width: 768px) {
                .mobil-menu-btn {
                    display: block;
                }
                
                .desktop-menu {
                    display: none;
                }
                
                .menu-active {
                    display: block !important;
                }
                
                .mobil-menu-btn.active {
                    color: #e94560;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Menü açma/kapama işlevi
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('menu-active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Sayfa yeniden boyutlandığında menüyü sıfırla
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('menu-active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

/**
 * Haber kartları için hover efektleri
 */
function setupHoverEffects() {
    // Tüm haber kartlarını seç
    const haberKartlari = document.querySelectorAll('.haber-karti, .gundem-haber, .son-dakika-karti, .benzer-haber');
    
    haberKartlari.forEach(kart => {
        kart.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        kart.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

/**
 * Yukarı çık butonu işlevselliği
 */
function setupScrollToTop() {
    // Yukarı çık butonu var mı kontrol et
    let yukariBtn = document.getElementById('yukariBtn');
    
    if (!yukariBtn) {
        // Yoksa oluştur
        const yeniBtn = document.createElement('div');
        yeniBtn.id = 'yukariBtn';
        yeniBtn.className = 'yukari-btn';
        yeniBtn.innerHTML = '↑';
        document.body.appendChild(yeniBtn);
        
        // Stil ekle (eğer CSS'te tanımlı değilse)
        if (!document.querySelector('style[data-for="yukari-btn"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-for', 'yukari-btn');
            style.textContent = `
                .yukari-btn {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    background-color: #e94560;
                    color: white;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 24px;
                    cursor: pointer;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    opacity: 0;
                    transition: opacity 0.3s, transform 0.3s;
                    z-index: 1000;
                }
                .yukari-btn.goster {
                    opacity: 1;
                }
                .yukari-btn:hover {
                    transform: translateY(-5px);
                }
            `;
            document.head.appendChild(style);
        }
        
        yukariBtn = yeniBtn;
    }
    
    // Scroll olayını dinle
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            yukariBtn.classList.add('goster');
        } else {
            yukariBtn.classList.remove('goster');
        }
    });
    
    // Tıklama olayını ekle
    yukariBtn.addEventListener('click', function() {
        // Yumuşak kaydırma animasyonu
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Sayfa geçişleri için animasyon
 */
function setupPageTransitions() {
    // Sayfa yüklendiğinde stil ekle
    if (!document.querySelector('style[data-for="page-transitions"]')) {
        const style = document.createElement('style');
        style.setAttribute('data-for', 'page-transitions');
        style.textContent = `
            body {
                background-color: #f5f5f5;
                opacity: 1;
                transition: opacity 0.3s ease;
            }
            
            .page-transition {
                opacity: 0.7;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Tüm menü linklerini seç
    const menuLinks = document.querySelectorAll('nav ul li a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Eğer zaten aktif sayfadaysa işlem yapma
            if (this.classList.contains('active')) return;
            
            // Geçerli sayfayı kaydet
            const currentPage = window.location.href;
            const targetPage = this.href;
            
            // Aynı sayfada değilse animasyon ekle
            if (currentPage !== targetPage) {
                e.preventDefault();
                
                // Sayfa geçiş animasyonu - tamamen beyaz ekran yerine hafif bir geçiş efekti
                document.body.classList.add('page-transition');
                
                setTimeout(function() {
                    window.location.href = targetPage;
                }, 300);
            }
        });
    });
    
    // Sayfa yüklendiğinde giriş animasyonu - beyaz ekran yanıp sönmesini önlemek için kaldırıldı
    // Bunun yerine CSS ile kontrol ediyoruz
}

/**
 * Haber detay sayfasına yönlendirme
 */
function setupNewsDetailRedirect() {
    // Tüm haber kartlarını seç
    const haberKartlari = document.querySelectorAll('.haber-karti, .gundem-haber, .son-dakika-karti');
    
    haberKartlari.forEach(kart => {
        if (kart.hasAttribute('onclick')) {
            // Zaten onclick özelliği varsa, onu kullan
            return;
        }
        
        kart.addEventListener('click', function() {
            // Kart içindeki haber ID'sini bul (veri özelliğinden veya başka bir yerden)
            let haberId = this.getAttribute('data-id');
            
            // Eğer data-id yoksa, başlıktan bir ID oluştur
            if (!haberId) {
                const baslik = this.querySelector('.haber-baslik, .gundem-baslik, .son-dakika-baslik');
                if (baslik) {
                    // Başlıktan basit bir hash oluştur
                    haberId = baslik.textContent.trim().toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '')
                        .substring(0, 20);
                } else {
                    haberId = Math.floor(Math.random() * 1000); // Rastgele ID
                }
            }
            
            // Haber detay sayfasına yönlendir
            window.location.href = `haber-detay.html?id=${haberId}`;
        });
    });
}

/**
 * İletişim formu doğrulama
 */
function setupContactFormValidation() {
    const contactForm = document.querySelector('.iletisim-formu');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const nameInput = contactForm.querySelector('input[name="ad"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const messageInput = contactForm.querySelector('textarea[name="mesaj"]');
        
        // Hata mesajlarını temizle
        const errorElements = contactForm.querySelectorAll('.hata-mesaji');
        errorElements.forEach(el => el.remove());
        
        // Ad kontrolü
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Ad alanı zorunludur');
            isValid = false;
        }
        
        // E-posta kontrolü
        if (!emailInput.value.trim()) {
            showError(emailInput, 'E-posta alanı zorunludur');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Geçerli bir e-posta adresi giriniz');
            isValid = false;
        }
        
        // Mesaj kontrolü
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Mesaj alanı zorunludur');
            isValid = false;
        }
        
        // Form geçerliyse gönderim animasyonu göster
        if (isValid) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Gönderiliyor...';
            
            // Form gönderimi simülasyonu (gerçek bir backend olmadığı için)
            setTimeout(function() {
                submitBtn.textContent = 'Gönderildi!';
                submitBtn.style.backgroundColor = '#4CAF50';
                
                // Formu temizle
                contactForm.reset();
                
                // Başarı mesajı göster
                const successMessage = document.createElement('div');
                successMessage.className = 'basari-mesaji';
                successMessage.textContent = 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.';
                contactForm.prepend(successMessage);
                
                // 3 saniye sonra butonu sıfırla
                setTimeout(function() {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        }
    });
    
    // Hata mesajı gösterme fonksiyonu
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'hata-mesaji';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e94560';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        
        input.style.borderColor = '#e94560';
        input.parentNode.appendChild(errorDiv);
        
        // Odaklandığında hata mesajını temizle
        input.addEventListener('focus', function() {
            this.style.borderColor = '';
            const error = this.parentNode.querySelector('.hata-mesaji');
            if (error) error.remove();
        });
    }
    
    // E-posta doğrulama fonksiyonu
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

/**
 * Haber arama işlevselliği
 */
function setupSearchFunctionality() {
    // Header'a arama kutusu ekle
    const header = document.querySelector('header .container');
    
    if (!header) return;
    
    // Arama kutusu zaten var mı kontrol et
    if (!document.querySelector('.arama-kutusu')) {
        // Arama kutusu oluştur
        const aramaKutusu = document.createElement('div');
        aramaKutusu.className = 'arama-kutusu';
        aramaKutusu.innerHTML = `
            <input type="text" placeholder="Haber ara..." id="aramaInput">
            <button id="aramaBtn">Ara</button>
        `;
        
        // Stil ekle
        if (!document.querySelector('style[data-for="arama-kutusu"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-for', 'arama-kutusu');
            style.textContent = `
                .arama-kutusu {
                    display: flex;
                    margin-top: 15px;
                }
                .arama-kutusu input {
                    padding: 8px 12px;
                    border: none;
                    border-radius: 4px 0 0 4px;
                    width: 200px;
                }
                .arama-kutusu button {
                    background-color: #e94560;
                    color: white;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 0 4px 4px 0;
                    cursor: pointer;
                }
                .arama-kutusu button:hover {
                    background-color: #d13354;
                }
                .arama-sonuclari {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: white;
                    border-radius: 0 0 4px 4px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    z-index: 100;
                    max-height: 300px;
                    overflow-y: auto;
                    display: none;
                }
                .arama-sonuclari.goster {
                    display: block;
                }
                .arama-sonuc-item {
                    padding: 10px 15px;
                    border-bottom: 1px solid #eee;
                    cursor: pointer;
                }
                .arama-sonuc-item:hover {
                    background-color: #f5f5f5;
                }
                @media (max-width: 768px) {
                    .arama-kutusu {
                        width: 100%;
                        margin-bottom: 15px;
                    }
                    .arama-kutusu input {
                        width: 70%;
                    }
                    .arama-kutusu button {
                        width: 30%;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        header.appendChild(aramaKutusu);
        
        // Arama işlevselliği
        const aramaInput = document.getElementById('aramaInput');
        const aramaBtn = document.getElementById('aramaBtn');
        
        // Arama sonuçları konteynerı
        const sonuclarDiv = document.createElement('div');
        sonuclarDiv.className = 'arama-sonuclari';
        aramaKutusu.appendChild(sonuclarDiv);
        
        // Arama butonu tıklama olayı
        aramaBtn.addEventListener('click', function() {
            aramaYap(aramaInput.value);
        });
        
        // Enter tuşu ile arama
        aramaInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                aramaYap(aramaInput.value);
            }
        });
        
        // Arama fonksiyonu
        function aramaYap(aramaMetni) {
            if (!aramaMetni.trim()) return;
            
            // Gerçek bir backend olmadığı için örnek sonuçlar göster
            const ornekSonuclar = [
                { id: 1, baslik: 'Ekonomi haberleri gündemde', kategori: 'Ekonomi' },
                { id: 2, baslik: 'Spor dünyasından son gelişmeler', kategori: 'Spor' },
                { id: 3, baslik: 'Teknoloji devlerinden yeni ürünler', kategori: 'Teknoloji' },
                { id: 10, baslik: 'Cumhurbaşkanı, ekonomi paketini açıkladı', kategori: 'Ekonomi' },
                { id: 11, baslik: 'Ege Denizi\'nde 5.2 büyüklüğünde deprem', kategori: 'Gündem' }
            ];
            
            // Arama metnine göre filtrele
            const filtrelenmis = ornekSonuclar.filter(sonuc => 
                sonuc.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
                sonuc.kategori.toLowerCase().includes(aramaMetni.toLowerCase())
            );
            
            // Sonuçları göster
            sonuclarDiv.innerHTML = '';
            
            if (filtrelenmis.length === 0) {
                sonuclarDiv.innerHTML = '<div class="arama-sonuc-item">Sonuç bulunamadı</div>';
            } else {
                filtrelenmis.forEach(sonuc => {
                    const sonucItem = document.createElement('div');
                    sonucItem.className = 'arama-sonuc-item';
                    sonucItem.innerHTML = `
                        <strong>${sonuc.baslik}</strong>
                        <span class="kategori-etiketi" style="font-size: 10px; padding: 2px 5px; margin-left: 5px;">${sonuc.kategori}</span>
                    `;
                    
                    sonucItem.addEventListener('click', function() {
                        window.location.href = `haber-detay.html?id=${sonuc.id}`;
                    });
                    
                    sonuclarDiv.appendChild(sonucItem);
                });
            }
            
            sonuclarDiv.classList.add('goster');
            
            // Dışarı tıklandığında sonuçları gizle
            document.addEventListener('click', function closeResults(e) {
                if (!aramaKutusu.contains(e.target)) {
                    sonuclarDiv.classList.remove('goster');
                    document.removeEventListener('click', closeResults);
                }
            });
        }
    }
}

/**
 * Son dakika haberleri için yanıp sönen efekt
 */
function setupBlinkingEffect() {
    // Son dakika etiketlerini seç
    const sonDakikaEtiketleri = document.querySelectorAll('.son-dakika-etiket');
    
    if (sonDakikaEtiketleri.length === 0) return;
    
    // Yanıp sönme efekti için stil ekle (eğer CSS'te tanımlı değilse)
    if (!document.querySelector('style[data-for="yanip-sonme"]')) {
        const style = document.createElement('style');
        style.setAttribute('data-for', 'yanip-sonme');
        style.textContent = `
            @keyframes yanipSon {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
            .yanip-son {
                animation: yanipSon 1.5s infinite;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Etiketlere yanıp sönme sınıfı ekle
    sonDakikaEtiketleri.forEach(etiket => {
        etiket.classList.add('yanip-son');
    });
    
    // Son dakika bandı için de aynı efekti uygula
    const sonDakikaBandi = document.querySelector('.son-dakika');
    if (sonDakikaBandi) {
        sonDakikaBandi.classList.add('yanip-son');
    }
}

/**
 * Haber kartları için tıklama efekti
 */
function setupClickEffect() {
    // Tüm haber kartlarını seç
    const haberKartlari = document.querySelectorAll('.haber-karti, .gundem-haber, .son-dakika-karti, .benzer-haber');
    
    haberKartlari.forEach(kart => {
        kart.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s';
        });
        
        kart.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        kart.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}