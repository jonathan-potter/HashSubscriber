'use strict';

export default (url) => {
  let [_, urlHash] = url.split('#');

  urlHash = urlHash || '';
  return urlHash.split('&').reduce((hash, keyValuePair) => {
    let [key, value] = keyValuePair.split('=');

    if (value || !isNaN(value)){
      if(isNaN(value)) {
        hash[key] = value;  
      } else {
        hash[key] = parseFloat(value);
      }
    } else if (key.length > 0) {
      hash[key] = true;
    }

    return hash;
  }, {});
};
