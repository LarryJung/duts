const sha256 = require('js-sha256');
const common = require('./common');
const fs = require('fs');

const makeDutsfilePath = common.makeDutsfilePath
const execCmd = common.execCmd
const seperator = common.seperator
const lineSeperator = common.lineSeperator

function memo(file, memo) {
  const convertedMemo = convertNewline(memo)
  const now = NOW()
  const beforeHash = `${file}${convertedMemo}${now}`
  const hash = sha256(beforeHash)
  const content = [file, now, convertedMemo, hash].join(seperator)
  fs.appendFile(makeDutsfilePath(file), content + lineSeperator, function (err) {
    if (err) {
      console.log(`cannot memo. error: ${err}`)
    } else {
      const filelines = fs.readFileSync(makeDutsfilePath(file)).toString().split(lineSeperator).slice(0, -1);
      execCmd(`processed. total ${filelines.length} memos`)
    }
  })
}

function convertNewline(content) {
  content = content.replace(/(?:\r\n|\r|\n)/g, '|||');
  return content
}

function NOW() {
  var date = new Date();
  var aaaa = date.getUTCFullYear();
  var gg = date.getUTCDate();
  var mm = (date.getUTCMonth() + 1);

  if (gg < 10)
    gg = "0" + gg;

  if (mm < 10)
    mm = "0" + mm;

  var cur_day = aaaa + "-" + mm + "-" + gg;

  var hours = date.getUTCHours()
  var minutes = date.getUTCMinutes()
  var seconds = date.getUTCSeconds();

  if (hours < 10)
    hours = "0" + hours;

  if (minutes < 10)
    minutes = "0" + minutes;

  if (seconds < 10)
    seconds = "0" + seconds;

  return cur_day + " " + hours + ":" + minutes + ":" + seconds;

}

module.exports = {
  memo: memo
}