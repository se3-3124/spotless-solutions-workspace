import i18next from 'i18next';

// Languages
import en from './languages/en.json';
import ja from './languages/ja.json';

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: en,
    },
    ja: {
      translation: ja,
    },
  },
});
