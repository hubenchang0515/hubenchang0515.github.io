import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'Moe Desktop',
        short_name: 'Moe Desktop',
        description: 'Web Desktop, including online running environments for Python, Lua, Ruby and other languages, Qt development tools, programming tutorials, technology blogs and other applications',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'PWA/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: "any"
          },
          {
            src: 'PWA/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
        screenshots: [
          {
            src: 'PWA/preview-main.png',
            sizes: '3840x2160',
            form_factor: 'wide',
          },
          {
            src: 'PWA/preview-python.png',
            sizes: '3840x2160',
          },
          {
            src: 'PWA/preview-qttheme.png',
            sizes: '3840x2160',
          },
          {
            src: 'PWA/preview-monitor.png',
            sizes: '3840x2160',
          },
        ]
      },
      devOptions: {
        enabled: true,
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 32 * 1024 ** 2, // 32 MB or set to something else
        globPatterns: ['**/*.{js,wasm,css,html,data}'],
      }
    }),
  ],
  
})
