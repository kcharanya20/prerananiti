import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",              // ✅ ADD THIS LINE
  plugins: [react()],
  define: {
    // This allows process.env.API_KEY to work in the browser
    // strictly replacing it with the string value during build
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
