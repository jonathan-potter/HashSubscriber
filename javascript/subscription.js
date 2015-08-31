'use strict';

import uuid from 'node-uuid';

const SUBSCRIPTION_PROTOTYPE = {
  properties: [],
  callback: function () {},
  guid: null
};

export default ({properties, callback}) => {
  let subscription = Object.create(SUBSCRIPTION_PROTOTYPE);

  subscription.properties = properties;
  subscription.callback = callback;
  subscription.guid = uuid.v4();

  return subscription;
};

export { SUBSCRIPTION_PROTOTYPE };
