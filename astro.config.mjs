import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import edgeone from '@edgeone/astro';

// https://astro.build/config
export default defineConfig({
  /*
  Currently it is deployed on Tencent Cloud EdgeOne, on an Asia-based Pages platform (the author is also based in Asia). 
  If users require, they can switch to Vercel or another Pages platform themselves.
  */
  adapter: edgeone(),
  integrations: [tailwind()],
  server: {
    port: 4321,
    host: true
  },
  devToolbar: {
    enabled: false
  },
  vite: {
    server: {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }
  }
});
