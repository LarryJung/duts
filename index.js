#!/usr/bin/env node

// dependencies
const program = require("commander");
const pkg = require("./package.json");
const Init = require('./init')

program
  .version(pkg.version)
  .command('init [file]')
  .description('initialize duts')
  .action((file) => Init.initialize(file))
program.parse(process.argv);