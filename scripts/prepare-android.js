const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const android = path.join(root, 'android');
const app = path.join(android, 'app');
const manifest = path.join(app, 'src/main/AndroidManifest.xml');
const valuesDir = path.join(app, 'src/main/res/values');
const strings = path.join(valuesDir, 'strings.xml');
const gradle = path.join(app, 'build.gradle');

const configPath = path.join(root, 'www/admob-config.js');
const configText = fs.readFileSync(configPath, 'utf8');
const appId = (configText.match(/appId:\s*'([^']+)'/) || [])[1];
if (!appId) throw new Error('Could not find AdMob appId in www/admob-config.js');

fs.mkdirSync(valuesDir, { recursive: true });
let xml = fs.existsSync(strings) ? fs.readFileSync(strings, 'utf8') : '<resources>\n</resources>\n';
if (xml.includes('<string name="admob_app_id">')) {
  xml = xml.replace(/<string name="admob_app_id">.*?<\/string>/, `<string name="admob_app_id">${appId}</string>`);
} else {
  xml = xml.replace('</resources>', `  <string name="admob_app_id">${appId}</string>\n</resources>`);
}
fs.writeFileSync(strings, xml);

let m = fs.readFileSync(manifest, 'utf8');
const meta = '<meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="@string/admob_app_id" />';
if (!m.includes('com.google.android.gms.ads.APPLICATION_ID')) {
  m = m.replace('</application>', `    ${meta}\n  </application>`);
}
fs.writeFileSync(manifest, m);

// Capacitor 6's generated Android project can default below the current AdMob
// compile/target requirements. Keep the app compatible with Android 7+ while
// compiling/targeting API 35 for the current Google Mobile Ads requirements.
let g = fs.readFileSync(gradle, 'utf8');
g = g.replace(/compileSdkVersion\s+\d+/, 'compileSdkVersion 35');
g = g.replace(/targetSdkVersion\s+\d+/, 'targetSdkVersion 35');
g = g.replace(/minSdkVersion\s+\d+/, 'minSdkVersion 24');
fs.writeFileSync(gradle, g);

console.log(`Android prepared for AdMob App ID ${appId}`);
