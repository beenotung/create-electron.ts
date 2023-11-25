export type Template = {
  filename: string
  content: string | object
}

export let templates: Template[] = []

templates.push({
  filename: 'index.html',
  content: /* html */ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Electron App</title>
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
})

templates.push({
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
})

templates.push({
  filename: 'preload.ts',
  content: `
declare let message: HTMLDivElement

window.addEventListener('DOMContentLoaded', () => {
  message.textContent =
    new Date() + '\\n' + JSON.stringify(process.versions, null, 2)
})
`,
})

templates.push({
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
})

templates.push({
  filename: 'package.json',
  content: {
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
})

templates.push({
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
})
