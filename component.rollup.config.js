/* eslint-env node */
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import svelte from 'rollup-plugin-svelte';
import nodePolyfills from 'rollup-plugin-node-polyfills';

import { main } from './package.json';

const bundle = (production) => ({
  input: 'src/HiGlass.svelte',
  output: [
    {
      file: production ? `${main.split('.')[0]}.min.js` : main,
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
  plugins: [
    svelte(),
    resolve({ browser: true, preferBuiltins: true }),
    commonjs(),
    nodePolyfills(),
    ...(production ? [terser()] : [filesize()]),
  ],
  external: ['svelte'],
});

const devBundle = bundle();
const prodBundle = bundle(true);

export default [devBundle, prodBundle];
