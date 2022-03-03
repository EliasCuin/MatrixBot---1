const https = require('https');
const cheerio = require('cheerio');

const adresse =
  'https://www.bsi.bund.de/SiteGlobals/Forms/Suche/BSI/Sicherheitswarnungen/Sicherheitswarnungen_Formular.html?cl2RespTargets_Risikostufe=5';

module.exports = async function loadStuff() {
  async function requete() {
    return new Promise((r, a) => {
      https
        .get(adresse, (resp) => {
          let data = '';
          resp.on('data', (chunk) => (data += chunk));
          resp.on('end', () => r(data));
        })
        .on('error', (err) =>
          console.log('Un Erreur est survenue :( : ' + err.message)
        );
    });
  }
  const stufenLength = [11, 15, 6, 4, 9];
  function removeSicherheit(obj) {
    for (let i = 0; i < obj.length; ++i) {
      obj[i].content = obj[i].content.substring(
        stufenLength[parseInt(obj[i].sicherheitsstufe) - 1]
      );
    }
    return obj;
  }
  async function filterSourceCode(code) {
    const element = cheerio.load(code);
    const elements = element('.c-security-alert__headline')
      .text()
      .split('            ')
      .join('')
      .split('\n');
    let r = [];
    for (let i = 1; i <= elements.length; ++i)
      if (i % 2 == 0)
        r.push({ sicherheitsstufe: elements[i - 1], content: elements[i] });

    return removeSicherheit(r);
  }
  const source = await requete();
  return filterSourceCode(source);
};
