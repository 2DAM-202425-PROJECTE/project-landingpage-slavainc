import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/project-landingpage-slavainc/', // Reemplaza con el nombre de tu repositorio
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                termes: resolve(__dirname, 'termes.html'),
                privacitat: resolve(__dirname, 'privacitat.html'),
                avis_legal: resolve(__dirname, 'avis_legal.html'),
            },
        },
    },
})
