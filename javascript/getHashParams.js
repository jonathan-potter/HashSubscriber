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

// function hashChangeHandler(event) {
//   let newParams = getHashParams(event.newURL);
//   let oldParams = getHashParams(event.oldURL);

//   map(subscribedEvents, subscribedEventName => {

//   });
//   /* loop through all of the subscribedEvent names looking */
//   /* for differences between newParams and oldParams */

//   /* trigger events for each of the events found */
// }

// let subscribedEvents = {};
// addEventListener('hashchange', hashChangeHandler);

// function subscribeToHashValues(hashValues, callback) {
  
// }

// export { getHashParams, hashChangeHandler, subscribeToHashValues };
// export { getHashParams };
