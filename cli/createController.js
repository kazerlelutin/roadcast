const fs = require('fs')
const path = require('path')

function createController(id) {
  const ctrlContent = [
    `export const input = {`,
    `\n`,
    `    state: {`,
    `\n`,
    `    },`,
    `\n`,
    `    onInit(state, el, e) {`,
    `\n`,
    `\n`,
    `\n`,
    `    },`,
    `\n`,
    `    render() {`,
    `\n`,
    `\n`,
    `    },`,
    `\n`,
    `  };`
  ].join('')

  const ctrlFolder = path.resolve(process.cwd(), `./front/ctrl`)
  const indexctrl = path.resolve(process.cwd(), `./front/ctrl/index.js`)

  if (!fs.existsSync(ctrlFolder)) {
    fs.mkdirSync(ctrlFolder)
  }

  const pathFile = path.resolve(process.cwd(), `./front/ctrl/${id}.js`)

  if (fs.existsSync(pathFile)) {
    console.log(`\n${key} already exist`)
    return
  }

  fs.writeFileSync(pathFile, ctrlContent)

  const indexContent = fs.readFileSync(indexctrl, 'utf8')
  const indexContentArray = indexContent.split('\n')
  indexContentArray.splice(
    indexContentArray.length,
    0,
    `export * from "./${id}"`
  )

  fs.writeFileSync(indexctrl, indexContentArray.join('\n'))
}

module.exports = {
  createController
}
