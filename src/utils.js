exports.startScanningLogWithTime = () => {
  let date_ob = new Date();
  console.log(
    '\n------ [' +
      date_ob.getHours() +
      ':' +
      date_ob.getMinutes +
      +'New Scanning ------'
  );
};

exports.startScanningLogWithoutTime = () => {
  let date_ob = new Date();
  console.log('---------' + 'New Scanning ------');
};

exports.getMissedMessages = (lastMessage, contentArray) => {
  //Get the Position of the Last Message in the Content Array
  contentArray = contentArray.filter((e, i) => i > 0).reverse();

  const lastMessagePos = contentArray
    .map((e, i) => e.content)
    .indexOf(lastMessage);
  //Setting a Reaturn Value with all New Value pushed
  return contentArray.filter((e, i) => i < lastMessagePos).reverse();
};

exports.sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
