import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./src/styles/element-theme.scss" as *;',
      },
    },
  },
  server: {
    port: 8080,
    proxy: {
      // '/api': 'http://localhost:3000'
    },
  },
  build: {
    target: 'es2020',
  },
  plugins: [
    vueJsx(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: './auto-imports.d.ts',
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: './components.d.ts',
    }),
  ],
});
