import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Determine the base path based on the environment
  const base = mode === 'production' ? 'https://github.com/Belphegor2801/hanyu' : '/';

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // Adjust 'src' if your folder structure is different
      },
    },
    base, // Set the base path
  };
});