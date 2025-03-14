/*
 * @author: phil.li
 */
const typescript = require('rollup-plugin-typescript2');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
import { uglify } from 'rollup-plugin-uglify';
import json from '@rollup/plugin-json';
const dts = require('rollup-plugin-dts').default;
import fs from 'fs';
import path from 'path';

const packagesDir = path.resolve(__dirname, 'packages');
const packageFiles = fs.readdirSync(packagesDir);

function output(path) {
  return [
    {
      input: [`./packages/${path}/src/index.ts`],
      output: [
        {
          file: `./packages/${path}/dist/index.cjs.js`,
          format: 'cjs',
          sourcemap: true,
        },
        {
          file: `./packages/${path}/dist/index.esm.js`,
          format: 'esm',
          sourcemap: true,
        },
        {
          file: `./packages/${path}/dist/index.js`,
          format: 'umd',
          name: 'web-see',
          sourcemap: true,
        },
        {
          file: `./packages/${path}/dist/index.min.js`,
          format: 'umd',
          name: 'web-see',
          sourcemap: true,
          plugins: [uglify()],
        },
      ],
      plugins: [
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              module: 'ESNext',
            },
          },
          useTsconfigDeclarationDir: true,
        }),
        nodeResolve(),
        commonjs(),
        json(),
      ],
    },
    {
      input: `./packages/${path}/src/index.ts`,
      output: [
        { file: `./packages/${path}/dist/index.cjs.d.ts`, format: 'cjs' },
        { file: `./packages/${path}/dist/index.esm.d.ts`, format: 'esm' },
        { file: `./packages/${path}/dist/index.d.ts`, format: 'umd' },
        { file: `./packages/${path}/dist/index.min.d.ts`, format: 'umd' },
      ],
      plugins: [dts()],
    },
  ];
}

export default [...packageFiles.map(path => output(path)).flat()];