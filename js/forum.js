/**
 * Güncel Haberler Sitesi - Forum JavaScript Dosyası
 * Bu dosya, forum sayfasının işlevselliğini sağlar.
 * Yerel depolama (localStorage) kullanarak forum konularını ve yorumları geçici olarak saklar.
 */

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Konu oluşturma formunu göster/gizle
    setupKonuForm();
    
    // Yerel depolamadan konuları yükle
    loadKonular();
    
    // Konu gönderme işlemi
    setupKonuGonder();
});

/**
 * Konu oluşturma formunu göster/gizle
 */
function setupKonuForm() {
    const konuOlusturBtn = document.getElementById('konu-olustur-btn');
    const konuForm = document.getElementById('konu-form');
    const konuIptal = document.getElementById('konu-iptal');
    
    if (!konuOlusturBtn || !konuForm || !konuIptal) return;
    
    konuOlusturBtn.addEventListener('click', function() {
        konuForm.classList.add('active');
        konuOlusturBtn.style.display = 'none';
    });
    
    konuIptal.addEventListener('click', function() {
        konuForm.classList.remove('active');
        konuOlusturBtn.style.display = 'block';
        konuForm.reset();
    });
}

/**
 * Konu gönderme işlemi
 */
function setupKonuGonder() {
    const konuGonderBtn = document.getElementById('konu-gonder');
    const konuForm = document.getElementById('konu-form');
    const konuOlusturBtn = document.getElementById('konu-olustur-btn');
    
    if (!konuGonderBtn) return;
    
    konuGonderBtn.addEventListener('click', function() {
        const baslik = document.getElementById('konu-baslik').value;
        const icerik = document.getElementById('konu-icerik').value;
        const yazar = document.getElementById('konu-yazar').value;
        
        if (!baslik.trim() || !icerik.trim() || !yazar.trim()) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }
        
        // Yeni konu oluştur
        const yeniKonu = {
            id: Date.now(),
            baslik: baslik,
            icerik: icerik,
            yazar: yazar,
            tarih: new Date().toLocaleString('tr-TR'),
            yorumlar: []
        };
        
        // Konuyu yerel depolamaya kaydet
        saveKonu(yeniKonu);
        
        // Konuyu listeye ekle
        addKonuToList(yeniKonu);
        
        // Formu temizle ve gizle
        document.getElementById('konu-baslik').value = '';
        document.getElementById('konu-icerik').value = '';
        document.getElementById('konu-yazar').value = '';
        konuForm.classList.remove('active');
        konuOlusturBtn.style.display = 'block';
        
        // Başarı mesajı göster
        showBasariMesaji('Konu başarıyla oluşturuldu.');
    });
}

/**
 * Konuyu yerel depolamaya kaydet
 */
function saveKonu(konu) {
    let konular = [];
    
    // Mevcut konuları al
    if (localStorage.getItem('forum_konular')) {
        konular = JSON.parse(localStorage.getItem('forum_konular'));
    }
    
    // Yeni konuyu ekle
    konular.push(konu);
    
    // Konuları yerel depolamaya kaydet
    localStorage.setItem('forum_konular', JSON.stringify(konular));
}

/**
 * Yerel depolamadan konuları yükle
 */
function loadKonular() {
    const konularListesi = document.getElementById('konular-listesi');
    
    if (!konularListesi) {
        console.error('Konular listesi bulunamadı');
        return;
    }
    
    // Listeyi temizle
    konularListesi.innerHTML = '';
    
    // Yerel depolamadan konuları al
    let konular = [];
    if (localStorage.getItem('forum_konular')) {
        try {
            konular = JSON.parse(localStorage.getItem('forum_konular'));
            
            // Veri bütünlüğünü kontrol et
            if (!Array.isArray(konular)) {
                console.error('Konular verisi dizi değil');
                konular = [];
            }
        } catch (e) {
            console.error('Konular yüklenirken hata oluştu:', e);
            konular = [];
        }
    }
    
    // Konuları en yeniden en eskiye doğru sırala
    konular.sort((a, b) => b.id - a.id);
    
    // Konuları listeye ekle
    konular.forEach(konu => {
        // Her konunun yorumlar dizisini kontrol et
        if (!Array.isArray(konu.yorumlar)) {
            konu.yorumlar = [];
        }
        addKonuToList(konu);
    });
    
    // Eğer hiç konu yoksa bilgi mesajı göster
    if (konular.length === 0) {
        konularListesi.innerHTML = '<div class="konu"><p>Henüz hiç konu oluşturulmamış. İlk konuyu siz oluşturun!</p></div>';
    }
    
    console.log(`${konular.length} konu yüklendi`);
}

/**
 * Konuyu listeye ekle
 */
function addKonuToList(konu) {
    const konularListesi = document.getElementById('konular-listesi');
    
    if (!konularListesi) {
        console.error('Konular listesi bulunamadı');
        return;
    }
    
    // Yorumlar dizisini kontrol et
    if (!Array.isArray(konu.yorumlar)) {
        konu.yorumlar = [];
    }
    
    const konuDiv = document.createElement('div');
    konuDiv.className = 'konu';
    konuDiv.dataset.id = konu.id;
    
    konuDiv.innerHTML = `
        <div class="konu-baslik">${konu.baslik}</div>
        <div class="konu-bilgi">
            <span>${konu.yazar} tarafından</span>
            <span>${konu.tarih}</span>
        </div>
        <div class="konu-detay" id="konu-detay-${konu.id}">
            <div class="konu-icerik">${konu.icerik}</div>
            <div class="yorumlar-baslik">Yorumlar (${konu.yorumlar.length})</div>
            <div class="yorumlar" id="yorumlar-${konu.id}">
                ${getYorumlarHTML(konu.yorumlar)}
            </div>
            <div class="yorum-form">
                <div class="form-grup">
                    <label for="yorum-isim-${konu.id}">İsminiz</label>
                    <input type="text" id="yorum-isim-${konu.id}" placeholder="İsminizi giriniz">
                </div>
                <div class="form-grup">
                    <label for="yorum-mesaj-${konu.id}">Yorumunuz</label>
                    <textarea id="yorum-mesaj-${konu.id}" placeholder="Yorumunuzu giriniz"></textarea>
                </div>
                <div class="form-butonlar">
                    <button class="form-buton gonder" id="yorum-gonder-${konu.id}">Yorum Yap</button>
                </div>
            </div>
        </div>
    `;
    
    // Konuyu listeye ekle (en başa)
    if (konularListesi.firstChild) {
        konularListesi.insertBefore(konuDiv, konularListesi.firstChild);
    } else {
        konularListesi.appendChild(konuDiv);
    }
    
    // Konu başlığına tıklandığında detayları göster/gizle
    konuDiv.querySelector('.konu-baslik').addEventListener('click', function() {
        const detay = document.getElementById(`konu-detay-${konu.id}`);
        if (detay) {
            detay.classList.toggle('active');
        }
    });
    
    // Yorum gönder butonuna tıklama olayı ekle
    const yorumGonderBtn = document.getElementById(`yorum-gonder-${konu.id}`);
    if (yorumGonderBtn) {
        yorumGonderBtn.addEventListener('click', function() {
            yorumGonder(konu.id);
        });
    }
}

/**
 * Yorumları HTML olarak döndür
 */
function getYorumlarHTML(yorumlar) {
    if (yorumlar.length === 0) {
        return '<div class="yorum">Henüz yorum yapılmamış. İlk yorumu siz yapın!</div>';
    }
    
    return yorumlar.map(yorum => `
        <div class="yorum">
            <div class="yorum-baslik">
                <strong>${yorum.isim}</strong>
                <span class="yorum-tarih">${yorum.tarih}</span>
            </div>
            <div class="yorum-icerik">${yorum.mesaj}</div>
        </div>
    `).join('');
}

/**
 * Yorum gönderme işlemi
 */
function yorumGonder(konuId) {
    const isimInput = document.getElementById(`yorum-isim-${konuId}`);
    const mesajInput = document.getElementById(`yorum-mesaj-${konuId}`);
    
    if (!isimInput || !mesajInput) {
        console.error('Yorum formu elemanları bulunamadı');
        return;
    }
    
    const isim = isimInput.value;
    const mesaj = mesajInput.value;
    
    if (!isim.trim() || !mesaj.trim()) {
        alert('Lütfen tüm alanları doldurun.');
        return;
    }
    
    // Yeni yorum oluştur
    const yeniYorum = {
        id: Date.now(),
        isim: isim,
        mesaj: mesaj,
        tarih: new Date().toLocaleString('tr-TR')
    };
    
    // Yorumu yerel depolamaya kaydet
    saveYorum(konuId, yeniYorum);
    
    // Yorumları güncelle
    updateYorumlar(konuId);
    
    // Formu temizle
    isimInput.value = '';
    mesajInput.value = '';
    
    // Başarı mesajı göster
    showBasariMesaji('Yorumunuz başarıyla eklendi.');
}

/**
 * Yorumu yerel depolamaya kaydet
 */
function saveYorum(konuId, yorum) {
    let konular = [];
    
    // Mevcut konuları al
    if (localStorage.getItem('forum_konular')) {
        try {
            konular = JSON.parse(localStorage.getItem('forum_konular'));
        } catch (e) {
            console.error('Konular yüklenirken hata oluştu:', e);
            konular = [];
        }
    }
    
    // Konuyu bul ve yorumu ekle
    const konuIndex = konular.findIndex(k => k.id == konuId);
    if (konuIndex !== -1) {
        // Eğer yorumlar dizisi yoksa oluştur
        if (!Array.isArray(konular[konuIndex].yorumlar)) {
            konular[konuIndex].yorumlar = [];
        }
        
        konular[konuIndex].yorumlar.push(yorum);
        
        // Konuları yerel depolamaya kaydet
        try {
            localStorage.setItem('forum_konular', JSON.stringify(konular));
            console.log(`Yorum eklendi: Konu ID ${konuId}, Yorum ID ${yorum.id}`);
        } catch (e) {
            console.error('Yorum kaydedilirken hata oluştu:', e);
            alert('Yorumunuz kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    } else {
        console.error(`Konu bulunamadı: ID ${konuId}`);
    }
}

/**
 * Yorumları güncelle
 */
function updateYorumlar(konuId) {
    let konular = [];
    
    // Mevcut konuları al
    if (localStorage.getItem('forum_konular')) {
        try {
            konular = JSON.parse(localStorage.getItem('forum_konular'));
        } catch (e) {
            console.error('Konular yüklenirken hata oluştu:', e);
            return;
        }
    }
    
    // Konuyu bul
    const konu = konular.find(k => k.id == konuId);
    if (konu) {
        // Yorumlar dizisini kontrol et
        if (!Array.isArray(konu.yorumlar)) {
            konu.yorumlar = [];
        }
        
        // Yorumlar bölümünü güncelle
        const yorumlarDiv = document.getElementById(`yorumlar-${konuId}`);
        if (yorumlarDiv) {
            yorumlarDiv.innerHTML = getYorumlarHTML(konu.yorumlar);
        } else {
            console.error(`Yorumlar div'i bulunamadı: ID yorumlar-${konuId}`);
        }
        
        // Yorum sayısını güncelle
        const yorumlarBaslik = document.querySelector(`#konu-detay-${konuId} .yorumlar-baslik`);
        if (yorumlarBaslik) {
            yorumlarBaslik.textContent = `Yorumlar (${konu.yorumlar.length})`;
        } else {
            console.error(`Yorumlar başlığı bulunamadı: ID konu-detay-${konuId}`);
        }
    } else {
        console.error(`Konu bulunamadı: ID ${konuId}`);
    }
}

/**
 * Başarı mesajı göster
 */
function showBasariMesaji(mesaj) {
    const basariMesaji = document.createElement('div');
    basariMesaji.className = 'basari-mesaji';
    basariMesaji.textContent = mesaj;
    
    // Mesajı sayfanın üst kısmına ekle
    const container = document.querySelector('main.container');
    if (container) {
        container.insertBefore(basariMesaji, container.firstChild);
        
        // 3 saniye sonra mesajı kaldır
        setTimeout(function() {
            basariMesaji.remove();
        }, 3000);
    }
}