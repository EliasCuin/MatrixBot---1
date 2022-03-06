const sdk = require('matrix-bot-sdk');
const MatrixClient = sdk.MatrixClient;
const SimpleFsStorageProvider = sdk.SimpleFsStorageProvider;
const AutojoinRoomsMixin = sdk.AutojoinRoomsMixin;
const settingsChanger = require('./settingsChanger.js');

// To edit this, go to the settings.json file
const homeserverUrl = settingsChanger.getBotCredits().homeserverUrl;
const accessToken = settingsChanger.getBotCredits().accessToken;
const channel = settingsChanger.getBotCredits().channel;
//

const storage = new SimpleFsStorageProvider('bot.json');

const client = new MatrixClient(homeserverUrl, accessToken, storage);
AutojoinRoomsMixin.setupOnClient(client);

exports.startClient = async () => {
  try {
    return new Promise((x) => {
      client.start().then(() => x('started'));
    });
  } catch {
    console.log(
      'Érreur lors de la connection à Matrix. Veuillez vérifier vos codes de connection et votre connection a Internet'
    );
  }
};

exports.send = (data) => {};

exports.channels = {
  botTest: channel
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
