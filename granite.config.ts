import { appsInToss } from '@apps-in-toss/framework/plugins';
import { defineConfig } from '@granite-js/react-native/config';

export default defineConfig({
  scheme: 'intoss',
  appName: 'todoit',
  plugins: [
    appsInToss({
      brand: {
        displayName: '오늘의 미션',
        primaryColor: '#4A9FF5',
        icon: 'https://sammyeom.github.io/todoit/icon.png',
      },
      permissions: [],
    }),
  ],
});
