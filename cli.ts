import { mkdirSync, writeFileSync } from 'fs'
import { templates } from './template'
import { getDest } from 'npm-init-helper'
import { basename, join } from 'path'

async function main() {
  let dest = await getDest()
  mkdirSync(dest)
  for (let template of templates) {
    let file = join(dest, template.filename)
    let content = template.content

    if (typeof content == 'object') {
      content = JSON.stringify(content, null, 2)
    }

    if (template.filename == 'index.html') {
      let title = basename(dest)
      content = content.replace(
        '<title>Electron App</title>',
        `<title>${title}</title>`,
      )
    }

    writeFileSync(file, content)
    console.log('created:', template.filename)
  }
  console.log(
    `
done.

Get started by typing:
  cd ${dest}
  npm install
  npm start
`.trim(),
  )
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
