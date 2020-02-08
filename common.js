const { exec } = require("child_process");

const dustInitDirectoryName = '.duts'
const seperator = '\0'

function execCmd(cmd) {
  console.log(cmd);
  exec(cmd)
}

function makeDutsfilePath(file) {
  const extensionRegex = /\.[0-9a-z]+$/i
  const dutsfileName = file.replace(extensionRegex, file.match(extensionRegex)[0] + '_duts')
  const dustfilePath = `${dustInitDirectoryName}/${dutsfileName}`
  return dustfilePath
}

module.exports = {
  execCmd: execCmd,
  makeDutsfilePath: makeDutsfilePath,
  dustInitDirectoryName: dustInitDirectoryName,
  seperator: seperator
}