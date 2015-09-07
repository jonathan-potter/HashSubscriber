'use strict';

import intersection from 'lodash/array/intersection';
import flatten from 'lodash/array/flatten';
import unique from 'lodash/array/intersection';

/* needs subscription sets to be defined somewhere */
/* an event with a subscription set will only fire once */
/* for all of the changes in the set. */

export default ({getHashParams, subscriptionsByProperty, subscriptionsByUUID, keysWithChangedValues, event}) => {
  /* get the new params object */
  /* get the old params object */
  let oldParams = getHashParams(event.oldURL);
  let newParams = getHashParams(event.newURL);

  let subscribedKeys = Object.keys(subscriptionsByProperty.subscriptions);

  /* identify the keys with changed values */
  let keysWithChanges = keysWithChangedValues(oldParams, newParams);

  let keysWithSubscribedEvents = intersection(keysWithChanges, subscribedKeys);

  // keysWithSubscribedEvents.
  /* loop through all of the subscribedEvent names looking */
  /* for differences between newParams and oldParams */
  let subscriptionUUIDs = keysWithSubscribedEvents.map(key => {
    return Object.keys(subscriptionsByProperty.subscriptions[key]);
  });

  subscriptionUUIDs = unique(flatten(subscriptionUUIDs));

  /* trigger events for each of the events found */

  let subscriptions = subscriptionUUIDs.map(subscriptionUUID => subscriptionsByUUID[subscriptionUUID]);

  subscriptions.forEach(subscription => { subscription.callback(newParams); });
};
