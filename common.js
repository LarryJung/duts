const { exec } = require("child_process");

// function execCmd(cmd) {
//   console.log(cmd);
//   exec(cmd)
// }

module.exports = (cmd) => {
  console.log(cmd);
  exec(cmd)
}