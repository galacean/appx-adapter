import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';


const plugins = [
  typescript({ tsconfig: './tsconfig.json' }),
  resolve(),
  commonjs(),
];

export default [
  'weapp',
  'alipay'
].map(platform => {
  return {
    input: `src/${platform}/index.ts`,
    output: [{
      file: `./dist/${platform}/index.mjs`,
      format: 'es',
      sourcemap: true,
    }, {
      file: `./dist/${platform}/index.js`,
      format: 'cjs',
      sourcemap: true,
    }],
    plugins,
  };
});
