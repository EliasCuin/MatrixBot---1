const fs = require('fs');
const settingsPath = './settings.json';

exports.setLastMessage = (message) => {
  const rawdata = fs.readFileSync(settingsPath);
  const data = JSON.parse(rawdata.toString());
  data.lastBotMessage = message;
  fs.writeFileSync(settingsPath, JSON.stringify(data));
};

exports.getLastMessage = () => {
  const rawdata = fs.readFileSync(settingsPath);
  return JSON.parse(rawdata.toString()).lastBotMessage;
};

exports.getWebsite = () => {
  const rawdata = fs.readFileSync(settingsPath);
  return JSON.parse(rawdata.toString()).website;
};

exports.getInterval = () => {
  const rawdata = fs.readFileSync(settingsPath);
  return JSON.parse(rawdata.toString()).interval_In_MS;
};

exports.getBotCredits = () => {
  const rawdata = fs.readFileSync(settingsPath);
  return JSON.parse(rawdata.toString()).bot_Credits;
};
