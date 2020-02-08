#!/usr/bin/env node

const program = require("commander");
const pkg = require("./package.json");
const { exec } = require("child_process");
const path = require('path');
const fs = require('fs');

const dustInitDirectoryName = '.duts'

program
  .version(pkg.version)
  .command('init [file]')
  .description('initialize duts')
  .action((file) => initialize(file))

program.parse(process.argv);

function initialize(file) {
  if (file === undefined) {
    initDirectory()
  } else {
    initFile(file)
  }
}

function initDirectory() {
  const directoryPath = path.join(__dirname, '.');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    makeDotDutsDirectory(files)
  });
}

function makeDotDutsDirectory(files) {
  if (fs.existsSync(dustInitDirectoryName)) {
    console.log(`duts already initialized! check ${dustInitDirectoryName} directory.`)
    return
  }

  execCmd('mkdir .duts')

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

// common 
function execCmd(cmd) {
  console.log(cmd);
  exec(cmd)
}