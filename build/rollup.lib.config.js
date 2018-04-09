import getPlugin from './get-plugin';
import { name } from '../package.json';

const entry = 'src/main/main.js';
const moduleName = 'Pawn';

export default [{
  input: entry,
  name: moduleName,
  output: {
    file: 'es/index.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    getPlugin('progress', {
      clear: true
    }),
    getPlugin('replace'),
    getPlugin('eslint'),
    getPlugin('alias'),
    getPlugin('postcss', {
      extract: 'lib/style.css',
      minify: false
    }),
    getPlugin('json'),
    getPlugin('resolve'),
    getPlugin('commonjs'),
    getPlugin('babel'),
    getPlugin('filesize')
  ].filter(p => p)
}, {
  input: entry,
  name: moduleName,
  output: {
    file: 'lib/index.min.js',
    format: 'umd',
    sourcemap: false
  },
  plugins: [
    getPlugin('progress', {
      clear: true
    }),
    getPlugin('replace'),
    getPlugin('eslint'),
    getPlugin('alias'),
    getPlugin('postcss', {
      extract: 'lib/style.min.css',
      minify: true
    }),
    getPlugin('json'),
    getPlugin('resolve'),
    getPlugin('commonjs'),
    getPlugin('babel'),
    getPlugin('uglify'),
    getPlugin('filesize')
  ].filter(p => p)
}];