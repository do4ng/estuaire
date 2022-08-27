/* eslint-disable import/no-extraneous-dependencies */
const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { join } = require('path');

esbuild.build({
  entryPoints: [join(process.cwd(), 'src/index.ts')],
  bundle: true,
  platform: 'node',
  outfile: join(process.cwd(), 'dist/index.js'),
  plugins: [nodeExternalsPlugin()],
});
esbuild.build({
  entryPoints: [join(process.cwd(), 'src/cli/bin.ts')],
  platform: 'node',
  bundle: true,
  outfile: join(process.cwd(), 'dist/bin.js'),
  plugins: [nodeExternalsPlugin()],
});
