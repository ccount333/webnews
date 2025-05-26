# Güncel Haberler Sohbet Botu - Yapay Zeka Entegrasyonu

## Genel Bakış

Bu projede, Güncel Haberler web sitesinin sohbet botu OpenAI GPT API'si kullanılarak yapay zeka ile entegre edilmiştir. Bu entegrasyon sayesinde, kullanıcılar daha akıllı ve doğal dil işleme yeteneklerine sahip bir sohbet deneyimi yaşayabilirler.

## Özellikler

- Yapay zeka destekli sohbet yanıtları
- Yükleniyor animasyonu ile kullanıcı deneyimi iyileştirmesi
- API bağlantısı başarısız olduğunda yedek yanıt sistemi
- Mobil uyumlu arayüz

## Kurulum

1. OpenAI API anahtarı alın: [OpenAI API](https://platform.openai.com/)
2. `js/chatbot.js` dosyasında `YOUR_API_KEY` değerini kendi API anahtarınızla değiştirin:

```javascript
const API_KEY = 'YOUR_API_KEY'; // Bu kısmı kendi API anahtarınızla değiştirin
```

## Güvenlik Notları

- API anahtarınızı doğrudan JavaScript dosyasında saklamak güvenli değildir. Gerçek bir üretim ortamında, API isteklerini bir arka uç sunucusu üzerinden yapmanız ve API anahtarınızı orada güvenli bir şekilde saklamanız önerilir.
- Alternatif olarak, çevre değişkenleri veya güvenli bir depolama mekanizması kullanabilirsiniz.

## Özelleştirme

Yapay zeka yanıtlarını özelleştirmek için, `getAIResponse` fonksiyonundaki sistem mesajını değiştirebilirsiniz:

```javascript
role: "system",
content: "Sen Güncel Haberler web sitesinin yardımcı bir sohbet asistanısın. Kullanıcılara haberler, site içeriği ve genel sorular hakkında yardımcı oluyorsun. Yanıtların kısa, bilgilendirici ve Türkçe olmalı."
```

## Kullanım Limitleri

OpenAI API'si kullanım başına ücretlendirilir. API kullanımınızı ve maliyetlerinizi kontrol etmek için OpenAI kontrol panelinizi düzenli olarak kontrol edin.