import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;

execSync('npx remix vite:build', {
  cwd: root
})

/**
 * Modify `index.html` public paths.
 */
{
  const indexHTML = join(root, 'build/client/index.html');
  const body = readFileSync(indexHTML, 'utf-8');
  writeFileSync(indexHTML, (
    body
      .replaceAll(/<\/head>/g, '<script>window.__REMIX_PUBLIC_PATH__ = "<%= remix_public_path %>";</script></head>')
      .replaceAll(/assets\//g, '<%= remix_public_path %>/assets/')
  ));
  console.log('Modified `index.html` public paths.');
}

/**
 * Modify `manifest-*.js` public paths.
 */
{
  const manifestJSFilename = readdirSync(join(root, 'build/client/assets')).find(v => v.startsWith('manifest-') && v.endsWith('.js'));
  if (!manifestJSFilename) {
    throw new Error('No manifest-*.js file found');
  }

  const manifestJS = join(root, 'build/client/assets', manifestJSFilename);
  const body = readFileSync(manifestJS, 'utf-8');
  writeFileSync(manifestJS, (
    body
      .replaceAll(/"assets\//g, 'window.__REMIX_PUBLIC_PATH__ + "/assets/')
  ));
  console.log('Modified `manifest-*.js` public paths.');
}
