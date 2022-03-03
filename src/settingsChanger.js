const fs = require('fs');
const settingsPath = './src/settings.json';

exports.setLastMessage = (message) => {
  fs.writeFileSync(settingsPath, '{ "lastBotMessage": "' + message + '" }');
};

exports.getLastMessage = () => {
  let rawdata = fs.readFileSync(settingsPath);
  return JSON.parse(rawdata.toString());
};
