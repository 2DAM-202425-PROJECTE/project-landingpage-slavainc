import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
// config options
base: '/slavainc/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },
})