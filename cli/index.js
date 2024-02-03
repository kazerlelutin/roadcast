const { hideBin } = require('yargs/helpers')
const yargs = require('yargs/yargs')
const { createTemplate } = require('./createTemplate')
const { createController } = require('./createController')

const argv = yargs(hideBin(process.argv)).argv

if (argv['t']) createTemplate(argv['id'])
if (argv['c']) createController(argv['id'])
if (argv['tc']) {
  createTemplate(argv['id'])
  createController(argv['id'])
}

//node ./cli -tc --id="name"
