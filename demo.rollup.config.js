/* eslint-env node */
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'demo/index.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js',
    globals: {
      'pixi.js': 'PIXI',
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-bootstrap': 'ReactBootstrap',
    },
  },
  external: ['pixi.js', 'react', 'react-dom', 'react-bootstrap'],
  plugins: [
    svelte({ dev: !production }),

    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),

    commonjs(),

    // Reload the browser when the build changes
    !production && livereload(),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
};
