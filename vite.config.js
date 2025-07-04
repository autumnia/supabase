import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['vite.svg', 'favicon.ico', 'robots.txt'], // 캐싱될 자료들
      registerType: 'autoUpdate',
      manifest: {
        name: '땅콩알바',
        short_name: '땅콩',
        description: '쉽고 편리한 구인구직 서비스',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })    
  ],
})
