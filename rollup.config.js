import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const commonPlugins = [
  json(),
  nodeResolve({
    jsnext: true
  }),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    externalHelpers: true
  }),
  commonjs({
    ignoreGlobal: true
  })
];
const externalDeps = Object.keys(Object.assign({}, pkg.dependencies, pkg.peerDependencies));
const nodeDeps = ['path'];
const external = externalDeps.concat(nodeDeps);

const configCreator = (input, file, env, config) => ({
  input,
  external,
  plugins: commonPlugins
    .concat([
      replace({
        'process.env.NODE_ENV': JSON.stringify(env)
      })
    ])
    .concat(env === 'production' ? [terser()] : []),
  output: {
    file,
    ...config
  }
});

export default [
  configCreator(
    'index.js',
    'dist/index.js',
    'production',
    {
      format: 'cjs',
      exports: 'named'
    }
  ),
  configCreator(
    'index.js',
    'dist/index.es.js',
    'production',
    {
      format: 'es'
    }
  )
];
