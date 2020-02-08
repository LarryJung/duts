const { exec } = require("child_process");

const dustInitDirectoryName = '.duts'
const seperator = '\0'
const lineSeperator = '\n'

function execCmd(cmd) {
  console.log(cmd);
  exec(cmd)
}

function makeDutsfilePath(file) {
  const extensionRegex = /\.[0-9a-z]+$/i
  var dutsfileName = ''
  if (file.match(extensionRegex) === null) {
    dutsfileName = file + '_duts'
  } else {
    dutsfileName = file.replace(extensionRegex, file.match(extensionRegex)[0] + '_duts')
  }
  const dustfilePath = `${dustInitDirectoryName}/${dutsfileName}`
  return dustfilePath
}

module.exports = {
  execCmd: execCmd,
  makeDutsfilePath: makeDutsfilePath,
  dustInitDirectoryName: dustInitDirectoryName,
  seperator: seperator,
  lineSeperator: lineSeperator
}