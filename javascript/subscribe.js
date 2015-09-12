'use strict';

export default ({Subscription, subscriptionsByUUID, subscriptionsByProperty, properties, callback}) => {
  /* make a subscription */
  let subscription = Subscription({properties, callback});

  /* add the subscription to the subscriptionsByUUID object */
  subscriptionsByUUID[subscription.uuid] = subscription;

  /* add references to the subscription to each of the */
  /* subscribed properties */
  properties.forEach((property) => {
    subscriptionsByProperty.add({property, subscription});
  });

  return subscription.uuid;
};


