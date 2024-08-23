import { createApp } from 'vue';
import App from './App.vue';
import { usePlugins } from './plugins';
import { router } from './router';
import './styles/index.scss';

createApp(App).use(router).use(usePlugins).mount('#app');
