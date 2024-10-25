import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import type { App } from 'vue';

export function installPrimeVue(app: App) {
  app.use(PrimeVue, {
    ripple: true,
    theme: {
      preset: Aura,
    },
  });
}
