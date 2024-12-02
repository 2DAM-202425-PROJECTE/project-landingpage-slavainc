import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/project-landingpage-slavainc/', // Reemplaza con el nombre de tu repositorio
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                termes: resolve(__dirname, 'pages/termes.html'),
                privacitat: resolve(__dirname, 'pages/privacitat.html'),
                avis_legal: resolve(__dirname, 'pages/avis_legal.html'),
                serveis: resolve(__dirname, 'pages/serveis.html'),
                contacte: resolve(__dirname, 'pages/contacte.html'),
                novetats: resolve(__dirname, 'pages/novetats.html'),

                login: resolve(__dirname, 'pages/login.html'),
                register: resolve(__dirname, 'pages/register.html'),
            },
        },
    },
})
