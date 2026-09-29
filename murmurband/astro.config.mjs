import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://murmurband.github.io',
  output: 'static',
  build: { format: 'file' },
});
