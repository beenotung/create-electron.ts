"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const npm_init_helper_1 = require("npm-init-helper");
const path_1 = require("path");
async function main() {
    let dest = await (0, npm_init_helper_1.getDest)();
    (0, fs_1.mkdirSync)(dest);
    function setupTemplate(template) {
        let file = (0, path_1.join)(dest, template.filename);
        let content = template.content;
        if (typeof content == 'object') {
            content = JSON.stringify(content, null, 2);
        }
        (0, fs_1.writeFileSync)(file, content);
        console.log('created:', template.filename);
    }
    setupTemplate({
        filename: 'index.html',
        content: /* html */ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${(0, path_1.basename)(dest)}</title>
    <style>
      #message {
        white-space: pre-wrap;
      }
    </style>
  </head>
  <body>
    <div id="message"></div>
  </body>
</html>
`,
    });
    setupTemplate({
        filename: 'main.ts',
        content: `
import { app, BrowserWindow } from 'electron'
import { resolve } from 'path'

function createWindow() {
  let win = new BrowserWindow({
    webPreferences: {
      preload: resolve('dist/preload.js'),
    },
  })
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length == 0) {
    createWindow()
  }
})
`,
    });
    setupTemplate({
        filename: 'preload.ts',
        content: `
declare let message: HTMLDivElement

window.addEventListener('DOMContentLoaded', () => {
  message.textContent =
    new Date() + '\\n' + JSON.stringify(process.versions, null, 2)
})
`,
    });
    setupTemplate({
        filename: 'tsconfig.json',
        content: {
            compilerOptions: {
                target: 'es2022',
                module: 'commonjs',
                esModuleInterop: true,
                forceConsistentCasingInFileNames: true,
                strict: true,
                skipLibCheck: true,
                incremental: true,
                outDir: 'dist',
            },
            exclude: ['dist'],
        },
    });
    setupTemplate({
        filename: 'package.json',
        content: {
            name: (0, path_1.basename)(dest),
            version: '0.0.0',
            scripts: {
                'start': 'run-p main tsc:watch',
                'main': 'electron -r ts-node/register main.ts',
                'tsc:watch': 'tsc -p . --watch',
                'test': 'tsc --noEmit',
                'build': 'tsc -p .',
            },
            devDependencies: {
                '@types/node': '^20.10.0',
                'electron': '^26.6.1',
                'npm-run-all': '^4.1.5',
                'ts-node': '^10.9.1',
                'ts-node-dev': '^2.0.0',
                'typescript': '^5.3.2',
            },
        },
    });
    setupTemplate({
        filename: '.gitignore',
        content: `
res/
node_modules/
dist/
*-lock.json
*-lock.yaml
*.lock
.*-debug.log
*.tsbuildinfo
.env
*.tgz
.DS_Store
.parcel-cache
`,
    });
    console.log(`
done.

Get started by typing:
  cd ${dest}
  npm install
  npm start
`.trim());
}
main().catch(error => {
    console.error(error);
    process.exit(1);
});
