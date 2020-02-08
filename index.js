#!/usr/bin/env node

// dependencies
const program = require("commander");
const pkg = require("./package.json");
const Init = require('./init')
const Memo = require('./memo')

program.version(pkg.version);

program
  .command('init [file]')
  .description('initialize duts')
  .action((file) => Init.initialize(file))

program
  .command('memo <file> <memo>')
  .description('add memo to file')
  .action((file, memo) => Memo.memo(file, memo))
program.parse(process.argv);