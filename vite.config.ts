import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    hmr: {
      timeout: 60000,
      overlay: false
    },
    watch: {
      usePolling: true
    }
  },
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['importAssertions']
        }
      }
    })
  ],
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-helmet-async', 
      'i18next', 
      'i18next-browser-languagedetector',
      'react-i18next', 
      'lucide-react',
      '@supabase/supabase-js'
    ],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  clearScreen: false,
  build: {
    sourcemap: true,
    target: 'esnext',
    rollupOptions: {
      output: {
        format: 'es',
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-helmet-async'],
          'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          'icons': ['lucide-react'],
          'supabase': ['@supabase/supabase-js']
        }
      }
    }
  }
});