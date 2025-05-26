# Chatbot API Kurulum Rehberi

## 1. OpenAI API Anahtarı Alma

### Adım 1: OpenAI Hesabı Oluşturma
1. [OpenAI Platform](https://platform.openai.com) adresine gidin
2. "Sign up" butonuna tıklayarak hesap oluşturun
3. E-posta adresinizi doğrulayın

### Adım 2: API Anahtarı Oluşturma
1. OpenAI Dashboard'a giriş yapın
2. Sol menüden "API Keys" sekmesine tıklayın
3. "Create new secret key" butonuna tıklayın
4. Anahtarınıza bir isim verin (örn: "Guncel-Haberler-Chatbot")
5. Oluşturulan anahtarı kopyalayın (bu anahtar sadece bir kez gösterilir!)

### Adım 3: API Anahtarını Chatbot'a Ekleme
1. `js/chatbot.js` dosyasını açın
2. 257. satırda bulunan `const API_KEY = '';` satırını bulun
3. Tırnak işaretleri arasına API anahtarınızı yapıştırın:
   ```javascript
   const API_KEY = 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
   ```

## 2. Alternatif API Sağlayıcıları

### OpenRouter (Daha Ucuz Seçenek)
```javascript
const API_KEY = 'sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
```

### Groq (Hızlı ve Ücretsiz)
```javascript
const API_KEY = 'gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
```

## 3. Güvenlik Uyarıları

⚠️ **ÖNEMLİ GÜVENLİK UYARILARI:**

1. **API anahtarınızı asla GitHub'a yüklemeyin!**
2. **Üretim ortamında API anahtarını backend'de saklayın**
3. **Rate limiting ve kullanım limitleri belirleyin**
4. **API anahtarınızı düzenli olarak yenileyin**

## 4. Maliyet Kontrolü

- OpenAI GPT-3.5-turbo: ~$0.002 / 1K token
- Günlük kullanım limitlerini OpenAI Dashboard'dan ayarlayın
- Chatbot'ta `max_tokens: 150` ile yanıt uzunluğunu sınırlayın

## 5. Chatbot Test Etme

1. API anahtarını ekledikten sonra siteyi açın
2. Sağ alt köşedeki chatbot ikonuna tıklayın
3. Bir test mesajı gönderin: "Merhaba"
4. Bot yanıt veriyorsa kurulum başarılı!

## 6. Sorun Giderme

### 401 Hatası (Unauthorized)
- API anahtarını kontrol edin
- Anahtarın doğru kopyalandığından emin olun
- OpenAI hesabınızda kredi olduğunu kontrol edin

### CORS Hatası
- Bu normal bir durumdur (tarayıcı güvenliği)
- Üretim ortamında backend kullanın

### Rate Limit Hatası
- Çok fazla istek gönderiyorsunuz
- Birkaç dakika bekleyin

## 7. Üretim İçin Öneriler

1. **Backend API Endpoint'i oluşturun:**
   ```javascript
   const API_URL = 'https://your-domain.com/api/chat';
   ```

2. **Environment Variables kullanın:**
   ```javascript
   const API_KEY = process.env.OPENAI_API_KEY;
   ```

3. **Rate Limiting ekleyin:**
   ```javascript
   // Kullanıcı başına dakikada 10 mesaj limiti
   ```

Bu rehberi takip ederek chatbot'unuzu güvenli bir şekilde çalıştırabilirsiniz.
