import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

i18n.defaultLocale = "zh-TW";
i18n.locale = "zh-TW";
i18n.fallbacks = true;
// Available languages
i18n.translations = {
  'zh-Hant-TW': require('../_locales/zh_TW/messages'),
  "zh-Hant-US": require('../_locales/zh_TW/messages'),
  'zh-hant': require('../_locales/zh_TW/messages'),
  'zh-TW': require('../_locales/zh_TW/messages'),
  'zh-hans': require('../_locales/zh_CN/messages'),
  'en': require('../_locales/en/messages'),
  'en-US': require('../_locales/en/messages'),
};
export default i18n;
