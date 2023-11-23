import 'dotenv/config';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function isHttps() {
  return process.env.HTTPS_CERT && process.env.HTTPS_KEY
}

function configureHttps() {
  if (!isHttps()) return {};
  const key = process.env.HTTPS_KEY as string;
  const cert = process.env.HTTPS_CERT as string;

  return {
    https: {
      key: Buffer.from(key, 'base64'),
      cert: Buffer.from(cert, 'base64'),
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http${isHttps() ? 's' : ''}://localhost:${isHttps() ? process.env.HTTPS_PORT : process.env.HTTP_PORT}`,
        secure: false,
      },
      '/oauth': {
        target: `http${isHttps() ? 's' : ''}://localhost:${isHttps() ? process.env.HTTPS_PORT : process.env.HTTP_PORT}`,
        secure: false,
      }
    },
    ...configureHttps()
  }
})
