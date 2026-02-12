/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from "vite-plugin-dts"
import path from 'path'
import {peerDependencies} from './package.json'
import { fileURLToPath } from 'url'

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.app.json",
    exclude: ["**/*.stories.*", "**/*.test.*"],
    })
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
  build: {
    lib: {
      entry: path.join(dirname, "/src/index.ts"),
      name: 'ui',
      fileName: (format) => `ui.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
      output: {globals: {react: 'React', 'react-dom': 'ReactDOM'}}
    }
  }
})
