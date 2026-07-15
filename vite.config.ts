/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// base './' → the same bundle works on GH project pages, the single-file artifact, and file://
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), ...(mode === 'artifact' ? [viteSingleFile()] : [])],
  build:
    mode === 'artifact'
      ? {
          outDir: 'dist-artifact',
          assetsInlineLimit: 100_000_000,
          cssCodeSplit: false,
          rollupOptions: { output: { inlineDynamicImports: true } },
        }
      : { outDir: 'dist' },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
}))
