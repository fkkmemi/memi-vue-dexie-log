import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MemiVueDexiLog',
      fileName: (format) => `memi-vue-dexi-log.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue(),
    dts({  // 타입 선언 파일 생성
      outDir: 'dist',
      insertTypesEntry: true,  // package.json에 typings 추가
      cleanVueFileName: true,
      // skipDiagnostics: false
    })
  ],
});