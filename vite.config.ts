import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {prismjsPlugin} from 'vite-plugin-prismjs'

// https://vitejs.dev/config/
export default defineConfig({
    // Android需要这种作为根路径
    base: './',
    build: {
        // 不混淆代码
        minify: false,
        // 输出目录，设为'${你自己项目路径}/app/src/main/assets/algo/'
        outDir: 'D:/Study/Android/VisuAlgo/app/src/main/assets/algo/',
        emptyOutDir: true
    },
    plugins: [
        vue(),
        // 代码高亮插件
        prismjsPlugin({
            theme: 'okaidia',
            css: true,
            languages: ['javascript'],
            plugins: [
                'line-numbers',
                'line-highlight',
                'normalize-whitespace',
                //'toolbar',
                //'show-language',
                //'copy-to-clipboard',
            ]
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
