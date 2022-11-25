import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll(), VitePWA({
    registerType: 'autoUpdate', injectRegister: 'auto',
    devOptions: {
      enabled: true
    },
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    manifest: {
      name: 'Offline Git',
      short_name: 'OfflineGit',
      description: 'Make Git availbe offline',
      theme_color: '#333',
      icons: [
        {
          src: './public/192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './public/512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })
  ]
})
