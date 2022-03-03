const sdk = require('matrix-bot-sdk');
const MatrixClient = sdk.MatrixClient;
const SimpleFsStorageProvider = sdk.SimpleFsStorageProvider;
const AutojoinRoomsMixin = sdk.AutojoinRoomsMixin;

//please enter credentials here
//----------------------------------------
/**/ const homeserverUrl = 'unknown'; //--
/**/ const accessToken = 'unknown'; //--
//-----------------------------------------

const storage = new SimpleFsStorageProvider('bot.json');

const client = new MatrixClient(homeserverUrl, accessToken, storage);
AutojoinRoomsMixin.setupOnClient(client);

exports.startClient = async () =>
  new Promise((x) => {
    client.start().then(() => x('started'));
  });

exports.send = (data) => {};

exports.channels = {
  botTest: '!CjwJfPIMJPjqgefELG:smartrx.ga'
};

exports.sendMessage = (channel, message) =>
  client.sendHtmlText(channel, message);

exports.sendExploitMessage = (channel, exploit) =>
  client.sendHtmlText(
    channel,
    '______________________<br><b>Neuer Exploit:</b><br>Sicherheitsstufe: <b>' +
      exploit.sicherheitsstufe +
      '</b>' +
      '\n<br>Content: <b>' +
      exploit.content +
      '</b> <br> Mehr dazu hier -> https://www.bsi.bund.de/SiteGlobals/Forms/Suche/BSI/Sicherheitswarnungen/Sicherheitswarnungen_Formular.html?cl2RespTargets_Risikostufe=5 <br>______________________'
  );
