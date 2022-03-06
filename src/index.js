const loadWebsite = require('./loadWebsite.js');
const bot = require('./bot.js');
const settingsChanger = require('./settingsChanger.js');
const utils = require('./utils.js');

const interval = settingsChanger.getInterval();
const website = settingsChanger.getWebsite();

//Developper settings
const connectToElement = true;
const unknownSicherheitsStufeError = website.substring(website.length - 1);
const editLastMessageInJson = false;
// - - -

async function start() {
  console.log('Checking Website ...');
  await loadWebsite(website);

  console.log('Starting Element client');

  if (connectToElement) await bot.startClient();

  console.log('Starting Main Loop -> Interval:' + interval);
  mainLoop();
  setInterval(mainLoop, interval);
}

async function mainLoop() {
  //Logging Time for new Scan
  utils.startScanningLogWithoutTime();

  //Getting Content
  console.log('Performing request to Website ... ');
  const content = await loadWebsite(website);
  //Get last Message
  const lastMessage = settingsChanger.getLastMessage();

  //Get missed messges
  const missedMessages = utils.getMissedMessages(
    lastMessage,
    content.reverse()
  );

  if (missedMessages.length > 0) {
    console.log(missedMessages.length.toString() + ' new Messages found:');

    for (let e of missedMessages) {
      utils.sleep(500);
      if (e.sicherheitsstufe == undefined)
        e.sicherheitsstufe = unknownSicherheitsStufeError;
      console.log(e);
      if (connectToElement) bot.sendExploitMessage(bot.channels.botTest, e);
    }
    if (editLastMessageInJson)
      settingsChanger.setLastMessage(
        missedMessages[missedMessages.length - 1].content
      );
  } else console.log('No messages found');

  console.log('------------');
  //
}

start();
//mainLoop();
