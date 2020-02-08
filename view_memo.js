const fs = require('fs');
const common = require('./common');
const makeDutsfilePath = common.makeDutsfilePath
const seperator = common.seperator
const lineSeperator = common.lineSeperator

const baseSpace = 5
const header_name = 'name'
const header_createdAt = 'created_at'
const header_memo = 'memo'
const header_hash = 'hash'

function log(fileName) {
  var headerPaddings = [0, 0, 0, 0]

  const filelines = fs.readFileSync(makeDutsfilePath(fileName)).toString().split(lineSeperator).slice(0, -1);

  headerPaddings[0] = Math.max(fileName.length + baseSpace, header_name.length)
  headerPaddings[1] = Math.max(filelines[0].split(seperator)[1].length + baseSpace, header_createdAt.length)
  headerPaddings[2] = Math.max(...filelines.map(o => convertMemo(o.split(seperator)[2]).length)) + baseSpace;
  headerPaddings[3] = Math.max(filelines[0].split(seperator)[3].length + baseSpace, header_hash.length)

  // print header
  console.log(header_name.padEnd(headerPaddings[0]) + header_createdAt.padEnd(headerPaddings[1]) + header_memo.padEnd(headerPaddings[2]) + header_hash.padEnd(headerPaddings[3]))

  filelines.forEach(line => {
    const sections = line.split(seperator)
      .map((section, index) => {
        if (index === 2) {
          return convertMemo(section).padEnd(headerPaddings[index])
        }
        return section.padEnd(headerPaddings[index])
      }).join("")
    console.log(sections)
  })
}

function convertMemo(memo) {
  return memo.split('|||').join(' \\n ')
}

module.exports = {
  log: log
}