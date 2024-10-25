import { installPrimeVue } from './prime-vue';

import type { App } from 'vue';

export function install(app: App) {
  installPrimeVue(app);
}
