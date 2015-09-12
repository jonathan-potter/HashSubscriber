'use strict';

export default ({subscriptionUUID, subscriptionsByUUID, subscriptionsByProperty}) => {
  let subscription = subscriptionsByUUID[subscriptionUUID];

  if (subscription) {
    /* remove the subscription from the subscriptionsByUUID object */
    delete subscriptionsByUUID[subscriptionUUID];

    /* remove references to the subscription from each of the subscribed properties */
    subscription.properties.forEach(property => {
      subscriptionsByProperty.remove({property, subscription});
    });
  }
};
