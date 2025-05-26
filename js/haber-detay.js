/**
 * Haber Detay Sayfası JavaScript Dosyası
 * Bu dosya, haber detay sayfasına özel işlevleri içerir.
 */

document.addEventListener('DOMContentLoaded', function() {
    // URL'den haber ID'sini al
    const urlParams = new URLSearchParams(window.location.search);
    const haberId = urlParams.get('id');
    
    if (haberId) {
        // Haber verilerini yükle
        haberVerileriniYukle(haberId);
        
        // Benzer haberleri yükle
        benzerHaberleriYukle(haberId);
        
        // Yorum bölümünü ayarla
        yorumBolumunuAyarla();
        
        // Paylaşım butonlarını ayarla
        paylasimButonlariniAyarla();
    } else {
        // ID yoksa ana sayfaya yönlendir
        window.location.href = 'index.html';
    }
});

/**
 * Haber verilerini yükle
 * @param {string} id - Haber ID'si
 */
function haberVerileriniYukle(id) {
    // Gerçek bir backend olmadığı için örnek veriler
    const haberVerileri = {
        1: {
            baslik: 'Cumhurbaşkanı, ekonomi paketini açıkladı',
            kategori: 'Ekonomi',
            tarih: '15 Mart 2025',
            saat: '15:30',
            yazar: 'Ahmet Yılmaz',
            yazarUnvan: 'Ekonomi Editörü',
            resim: 'https://via.placeholder.com/800x400?text=Ekonomi+Paketi',
            icerik: `<p>Cumhurbaşkanı, bugün düzenlenen basın toplantısında yeni ekonomik reform paketini kamuoyuna duyurdu. Pakette ekonomiyi canlandırmaya yönelik önemli teşvik ve destekler yer alıyor.</p>
                    <p>Özellikle KOBİ'lere sağlanacak yeni kredi imkanları ve vergi indirimleri dikkat çekiyor. Ayrıca, ihracatçılara yönelik yeni teşvikler de pakette yer alıyor.</p>
                    <p>Ekonomi uzmanları, paketin piyasalara olumlu yansıyacağını ve ekonomik canlanmaya katkı sağlayacağını belirtiyor. Ancak, bazı uzmanlar da paketin uzun vadeli etkilerinin sınırlı olabileceği konusunda uyarılarda bulunuyor.</p>
                    <p>Pakette yer alan başlıca düzenlemeler şunlar:</p>
                    <ul>
                        <li>KOBİ'lere düşük faizli kredi imkanları</li>
                        <li>İhracatçılara vergi avantajları</li>
                        <li>Yeni istihdam teşvikleri</li>
                        <li>Dijital dönüşüm destekleri</li>
                        <li>Yeşil ekonomi yatırımlarına özel teşvikler</li>
                    </ul>
                    <p>Paketin detayları önümüzdeki günlerde ilgili bakanlıklar tarafından açıklanacak.</p>`
        },
        2: {
            baslik: 'Ege Denizi\'nde 5.2 büyüklüğünde deprem',
            kategori: 'Gündem',
            tarih: '15 Mart 2025',
            saat: '14:45',
            yazar: 'Mehmet Demir',
            yazarUnvan: 'Haber Muhabiri',
            resim: 'https://via.placeholder.com/800x400?text=Deprem+Haberi',
            icerik: `<p>Kandilli Rasathanesi, Ege Denizi'nde 5.2 büyüklüğünde bir deprem meydana geldiğini duyurdu. Deprem, İzmir ve çevre illerde hissedildi.</p>
                    <p>İlk belirlemelere göre can ve mal kaybı bulunmuyor. AFAD ekipleri bölgede gerekli incelemelerini sürdürüyor.</p>
                    <p>Depremin merkez üssü, İzmir'in yaklaşık 30 km açığı olarak belirlendi. Deprem, saat 14:45'te meydana geldi ve yaklaşık 15 saniye sürdü.</p>
                    <p>Vatandaşlar, deprem anını sosyal medyada paylaştı. Birçok kişi, depremi hissettiklerini ve kısa süreli panik yaşadıklarını belirtti.</p>
                    <p>Uzmanlar, bölgede artçı sarsıntıların devam edebileceğini ve vatandaşların dikkatli olması gerektiğini vurguluyor.</p>`
        },
        3: {
            baslik: 'Döviz kurlarında hareketli saatler',
            kategori: 'Ekonomi',
            tarih: '15 Mart 2025',
            saat: '13:20',
            yazar: 'Zeynep Kaya',
            yazarUnvan: 'Finans Analisti',
            resim: 'https://via.placeholder.com/800x400?text=Döviz+Kurları',
            icerik: `<p>Ekonomi paketinin açıklanmasının ardından döviz kurlarında hareketlilik yaşanıyor. Açıklamanın ardından Dolar ve Euro kurunda önemli değişimler gözlemlendi.</p>
                    <p>Uzmanlar, gelişmeleri değerlendiriyor ve yatırımcılara tavsiyelerde bulunuyor. Piyasalardaki hareketliliğin birkaç gün daha devam etmesi bekleniyor.</p>
                    <p>Merkez Bankası'nın olası müdahaleleri de yakından takip ediliyor. Ekonomi yönetimi, kur dalgalanmalarının geçici olduğunu ve piyasaların kısa sürede dengeye kavuşacağını belirtiyor.</p>
                    <p>Yatırımcılar ise temkinli bir yaklaşım sergileyerek, gelişmeleri izlemeyi tercih ediyor.</p>`
        },
        4: {
            baslik: "Risk Gruplarına Ücretsiz Grip Aşısı Uygulaması Başladı",
            kategori: "Sağlık",
            tarihSaat: "14 Mart 2025, 10:30",
            yazar: "Sağlık Editörü",
            resim: "resimler/saglik.jpg",
            icerik: `
                <p>Sağlık Bakanlığı tarafından belirlenen risk gruplarına yönelik ücretsiz grip aşısı uygulaması ülke genelinde başladı. Kronik hastalığı olanlar, 65 yaş üstü bireyler, gebeler ve sağlık çalışanları öncelikli olarak aşılanacak.</p>
                <p>Aşılar, aile sağlığı merkezleri ve devlet hastanelerinde randevu alınarak yaptırılabilecek. Uzmanlar, özellikle kış ayları öncesinde risk grubundaki vatandaşların aşılarını yaptırmalarının önemine dikkat çekiyor.</p>
                <p>Uygulama ile ilgili detaylı bilgi ve randevu işlemleri için Sağlık Bakanlığı'nın resmi internet sitesi ziyaret edilebilir veya 184 numaralı Sağlık Danışma Hattı aranabilir.</p>
            `
        },
        5: {
            baslik: 'Uluslararası Film Festivali başlıyor',
            kategori: 'Kültür-Sanat',
            tarih: '13 Mart 2025',
            saat: '18:00',
            yazar: 'Deniz Yıldız',
            yazarUnvan: 'Kültür-Sanat Editörü',
            resim: 'https://via.placeholder.com/800x400?text=Film+Festivali',
            icerik: `<p>Bu yıl 25. kez düzenlenecek olan Uluslararası Film Festivali, dünya sinemasının en iyilerini ağırlayacak.</p>
                    <p>Festival kapsamında 35 ülkeden 120 film gösterilecek. Ayrıca, ünlü yönetmenler ve oyuncuların katılacağı söyleşiler de düzenlenecek.</p>
                    <p>Festival, 20-30 Mart tarihleri arasında şehrin çeşitli sinemalarında gerçekleştirilecek.</p>
                    <p>Biletler, festivalin resmi web sitesi üzerinden satışa sunuldu.</p>`
        },
        6: {
            baslik: 'Yeni eğitim-öğretim yılı takvimi açıklandı',
            kategori: 'Eğitim',
            tarih: '13 Mart 2025',
            saat: '09:45',
            yazar: 'Fatma Şahin',
            yazarUnvan: 'Eğitim Muhabiri',
            resim: 'https://via.placeholder.com/800x400?text=Eğitim+Takvimi',
            icerik: `<p>Milli Eğitim Bakanlığı, önümüzdeki eğitim-öğretim yılına ilişkin detayları paylaştı.</p>
                    <p>Yeni eğitim-öğretim yılı 15 Eylül'de başlayacak ve 18 Haziran'da sona erecek.</p>
                    <p>Yarıyıl tatili 20 Ocak - 3 Şubat tarihleri arasında yapılacak.</p>
                    <p>Bakanlık yetkilileri, yeni müfredat çalışmalarının da tamamlandığını ve yeni dönemde uygulanacağını belirtti.</p>`
        }
    };
    
    // Haber ID'sine göre veriyi al
    const haber = haberVerileri[id];
    
    if (haber) {
        // Sayfa başlığını güncelle
        document.title = haber.baslik + ' - Güncel Haberler';
        
        // Haber içeriğini doldur
        document.querySelector('.haber-baslik').textContent = haber.baslik;
        document.querySelector('.kategori-etiketi').textContent = haber.kategori;
        document.querySelector('.haber-tarih').textContent = haber.tarih + ' ' + haber.saat;
        document.querySelector('.haber-resim-buyuk').src = haber.resim;
        document.querySelector('.haber-resim-buyuk').alt = haber.baslik;
        document.querySelector('.haber-icerik').innerHTML = haber.icerik;
        
        // Yazar bilgilerini güncelle
        const yazarBilgisi = document.querySelector('.yazar-bilgisi');
        if (yazarBilgisi) {
            document.querySelector('.yazar-isim').textContent = haber.yazar;
            document.querySelector('.yazar-unvan').textContent = haber.yazarUnvan;
        }
    } else {
        // Haber bulunamadıysa ana sayfaya yönlendir
        window.location.href = 'index.html';
    }
}

/**
 * Benzer haberleri yükle
 * @param {string} currentId - Mevcut haber ID'si
 */
function benzerHaberleriYukle(currentId) {
    // Gerçek bir backend olmadığı için örnek veriler
    const benzerHaberler = [
        { id: 15, baslik: 'Ekonomistler yeni paketi değerlendirdi', resim: 'https://via.placeholder.com/300x200?text=Ekonomi' },
        { id: 16, baslik: 'Borsada yükseliş trendi devam ediyor', resim: 'https://via.placeholder.com/300x200?text=Borsa' },
        { id: 17, baslik: 'Yeni vergi düzenlemeleri neler getiriyor?', resim: 'https://via.placeholder.com/300x200?text=Vergi' },
        { id: 18, baslik: 'Merkez Bankası faiz kararını açıkladı', resim: 'https://via.placeholder.com/300x200?text=Faiz' }
    ];
    
    const benzerListeDiv = document.querySelector('.benzer-liste');
    
    if (benzerListeDiv) {
        // Benzer haberleri temizle
        benzerListeDiv.innerHTML = '';
        
        // Benzer haberleri ekle
        benzerHaberler.forEach(haber => {
            // Mevcut haberle aynı ID'ye sahip haberi gösterme
            if (haber.id == currentId) return;
            
            const haberDiv = document.createElement('div');
            haberDiv.className = 'benzer-haber';
            haberDiv.innerHTML = `
                <img src="${haber.resim}" alt="${haber.baslik}">
                <div class="benzer-haber-baslik">${haber.baslik}</div>
            `;
            
            haberDiv.addEventListener('click', function() {
                window.location.href = `haber-detay.html?id=${haber.id}`;
            });
            
            benzerListeDiv.appendChild(haberDiv);
        });
    }
}

/**
 * Yorum bölümünü ayarla
 */
function yorumBolumunuAyarla() {
    const yorumForm = document.querySelector('.yorum-form');
    
    if (!yorumForm) return;
    
    yorumForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isim = document.getElementById('yorum-isim').value;
        const yorum = document.getElementById('yorum-mesaj').value;
        
        if (!isim.trim() || !yorum.trim()) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }
        
        // Yeni yorum ekle
        const yorumlarDiv = document.querySelector('.yorumlar');
        const yeniYorum = document.createElement('div');
        yeniYorum.className = 'yorum';
        yeniYorum.innerHTML = `
            <div class="yorum-baslik">
                <strong>${isim}</strong>
                <span class="yorum-tarih">Şimdi</span>
            </div>
            <div class="yorum-icerik">${yorum}</div>
        `;
        
        yorumlarDiv.prepend(yeniYorum);
        
        // Formu temizle
        yorumForm.reset();
        
        // Başarı mesajı
        const basariMesaji = document.createElement('div');
        basariMesaji.className = 'basari-mesaji';
        basariMesaji.textContent = 'Yorumunuz başarıyla eklendi.';
        basariMesaji.style.backgroundColor = '#4CAF50';
        basariMesaji.style.color = 'white';
        basariMesaji.style.padding = '10px';
        basariMesaji.style.borderRadius = '4px';
        basariMesaji.style.marginBottom = '15px';
        
        yorumForm.prepend(basariMesaji);
        
        // 3 saniye sonra mesajı kaldır
        setTimeout(function() {
            basariMesaji.remove();
        }, 3000);
    });
}

/**
 * Paylaşım butonlarını ayarla
 */
function paylasimButonlariniAyarla() {
    const paylasimDiv = document.querySelector('.sosyal-paylas');
    
    if (!paylasimDiv) return;
    
    // Paylaşım butonlarına tıklama olayları ekle
    const butonlar = paylasimDiv.querySelectorAll('a');
    
    butonlar.forEach(buton => {
        buton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const baslik = encodeURIComponent(document.querySelector('.haber-baslik').textContent);
            
            let shareUrl = '';
            
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${baslik}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${baslik} ${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank');
            }
        });
    });
}