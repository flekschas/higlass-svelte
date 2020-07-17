/* eslint-env node */
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import svelte from 'rollup-plugin-svelte';

import { main } from './package.json';

export default {
  input: 'src/HiGlass.svelte',
  output: [
    {
      file: main,
      format: 'es',
      exports: 'default',
      globals: {
        'pixi.js': 'PIXI',
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-bootstrap': 'ReactBootstrap',
      },
    },
  ],
  plugins: [svelte(), resolve(), commonjs(), filesize()],
  external: ['pixi.js', 'react', 'react-dom', 'react-bootstrap', 'svelte'],
};
