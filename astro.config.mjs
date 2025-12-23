import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import edgeone from '@edgeone/astro';

// https://astro.build/config
export default defineConfig({
  
  site: 'https://os-devsec.github.io',
  base: '/os-devsec/',
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
