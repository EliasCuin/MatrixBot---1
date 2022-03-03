const loadWebsite = require('./loadWebsite.js');
const bot = require('./bot.js');
const settingsChanger = require('./settingsChanger.js');

const interval = 1800; // 30 Minuten

async function main() {
  console.log('Connecting to Element . . .');
  const content = await loadWebsite();
  await bot.startClient();

  // bot.sendExploitMessage(bot.channels.botTest, {
  //   sicherheitsstufe: '1',
  //   content: 'Hello World'
  // });
  mainLoop();
  setInterval(mainLoop, 150000);
}

async function mainLoop() {
  const content = await loadWebsite();

  console.log(settingsChanger.getLastMessage().lastBotMessage);
  console.log(content[0].content);
  if (settingsChanger.getLastMessage().lastBotMessage != content[0].content) {
    // New Message
    settingsChanger.setLastMessage(content[0].content);

    console.log('New Message Detected -> Sending Element Message . . .');
    bot.sendExploitMessage(bot.channels.botTest, content[0]);
    console.log('Element Message sended');
  }
}
main();
//mainLoop();
