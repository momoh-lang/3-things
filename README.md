# 3 Things — Android + AdMob

المشروع عبارة عن تطبيق To-Do بسيط مبني بـ HTML/CSS/JavaScript ومغلف بواسطة Capacitor 6.

## AdMob

تمت إضافة `@capacitor-community/admob@6` المتوافقة مع Capacitor 6، مع Banner Adaptive أسفل الشاشة.

### مهم قبل النشر

الملف:

`www/admob-config.js`

تم وضع **AdMob App ID** و**Banner Ad Unit ID** الخاصين بتطبيقك داخل `www/admob-config.js`.

حاليًا `isTesting: true` حتى تختبر التطبيق بأمان باستخدام إعلانات اختبار. بعد التأكد من ظهور الإعلان وعدم وجود أخطاء، غيّرها إلى `false` في نسخة الإنتاج فقط.

لا تضغط على الإعلانات الحقيقية أثناء اختبار التطبيق؛ استخدم الإعلانات التجريبية.

## Build with GitHub Actions

ارفع المشروع إلى GitHub ثم افتح Actions وشغّل **Build Android app**.

سيتم إنشاء:
- `3things-debug-apk` للاختبار على الهاتف.
- `3things-release-aab-unsigned` كحزمة Release غير موقعة.

### Google Play

رفع AAB إلى Google Play يحتاج توقيع Release بمفتاح Keystore خاص بك. لا تضع كلمة مرور الـKeystore داخل الملفات أو GitHub repository؛ استخدم GitHub Secrets أو Android Studio عند تجهيز النسخة النهائية.

## Local build

```bash
npm install
npx cap add android
npx cap sync android
node scripts/prepare-android.js
cd android
./gradlew assembleDebug
./gradlew bundleRelease
```

## Package ID

الـApplication ID الحالي:

`com.threethings.app`

يمكن تغييره لاحقًا إلى ID فريد خاص بالتطبيق قبل النشر.
