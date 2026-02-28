import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: isDev
            ? 'http://localhost:5000'
            : 'https://ecom-9ygt.onrender.com',
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
});