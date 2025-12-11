import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
    base: '/app/',
    plugins: [
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        VitePWA({
            registerType: 'autoUpdate',
            strategies: 'generateSW',
            manifest: {
                name: 'Dictionary',
                short_name: 'Dictionary',
                description: 'Offline-first dictionary app',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                start_url: '/app/',
            },
            workbox: {
                cleanupOutdatedCaches: true,
                clientsClaim: true,
                skipWaiting: true,
                globIgnores: ['**/dict*.js'],
                runtimeCaching: [
                    {
                        urlPattern: /dict.*\.js$/,
                        handler: 'NetworkOnly',
                    },
                ],
            },
        }),
        visualizer() as PluginOption,
    ],
})
