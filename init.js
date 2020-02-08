const path = require('path');
const fs = require('fs');
const execCmd = require('./common.js');

const dustInitDirectoryName = '.duts'

function initialize(file) {
  if (fs.existsSync(dustInitDirectoryName)) {
    console.log(`duts already initialized! check ${dustInitDirectoryName} directory.`)
    return
  }
  execCmd('mkdir .duts')

  if (file === undefined) {
    initDirectory()
    return
  }
  initFile(file)
}

function initDirectory() {
  const directoryPath = path.join(__dirname, '.');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    makeDotDutsfiles(files)
  });
}

function makeDotDutsfiles(files) {
  files.forEach(file => {
    if (fs.lstatSync(file).isFile() && !file.startsWith(".")) {
      const dustfilePath = makeDutsfilePath(file)
      if (!fs.existsSync(dustfilePath)) {
        execCmd(`touch ${dustfilePath}`)
      }
    }
  });
}

function makeDutsfilePath(file) {
  const extensionRegex = /\.[0-9a-z]+$/i
  const dutsfileName = file.replace(extensionRegex, file.match(extensionRegex)[0] + '_duts')
  const dustfilePath = `${dustInitDirectoryName}/${dutsfileName}`
  return dustfilePath
}

function initFile(file) {
  const dustfilePath = makeDutsfilePath(file)
  try {
    if (fs.existsSync(dustfilePath)) {
      console.log(`dustsfile exist. ${dustfilePath}`)
    } else {
      execCmd(`touch ${dustfilePath}`)
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  initialize: initialize
}