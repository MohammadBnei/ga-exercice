console.log("A very basic node js app");

function sum(a, b) {
  return a + b;
}

const osu = require("node-os-utils");
const cpu = osu.cpu;

cpu.usage().then((cpuPercentage) => {
  console.log(cpuPercentage); // 10.38
});

var osCmd = osu.osCmd;

osCmd.whoami().then((userName) => {
  console.log(userName); // admin
});

const drive = osu.drive;

drive.info().then((info) => {
  console.log(info);
});

module.exports = sum;
