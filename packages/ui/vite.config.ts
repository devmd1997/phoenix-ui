import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from "vite-plugin-dts"
import path from 'path'
import {peerDependencies} from './package.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    dts({
      entryRoot: "src",
      tsconfigPath: path.resolve(__dirname, "tsconfig.json"),
      insertTypesEntry: true,
      exclude: ["**/*.text.ts"]
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/index.ts"),
      name: "ui",
      formats: ["es", "cjs", 'umd'],
      fileName: (format) => `ui.${format}.js`,
    },
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      external: Object.keys(peerDependencies),
      output: {globals: {react: 'React', 'react-dom': 'ReactDOM'}}
    }
  }
})
