const sleep = (waitTimeInMs) =>{
  return new Promise(((resolve) => { return setTimeout(resolve, waitTimeInMs); }));
};

module.exports = {
  sleep,
};
