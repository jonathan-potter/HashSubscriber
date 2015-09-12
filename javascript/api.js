'use strict';

import getHashParams           from 'javascript/getHashParams';
import hashChangeHandler       from 'javascript/hashChangeHandler';
import keysWithChangedValues   from 'javascript/keysWithChangedValues';
import subscribe               from 'javascript/subscribe';
import Subscription            from 'javascript/Subscription';
import SubscriptionsByProperty from 'javascript/subscriptionsByProperty';
import subscriptionsByUUID     from 'javascript/subscriptionsByUUID';
import unsubscribe             from 'javascript/unsubscribe';

let subscriptionsByProperty = SubscriptionsByProperty();

/* probably should migrate this to a factory at some point to avoid possible singleton issues */
export default {
  ensureInitialization() {
    if (!this.initialized) {
      this.init();
      this.initialized = true;
    }
  },
  init() {
    return window.addEventListener('hashchange', event => {
      hashChangeHandler({
        event,
        getHashParams,
        keysWithChangedValues,
        subscriptionsByProperty,
        subscriptionsByUUID
      });
    });
  },
  subscribe(properties, callback) {
    this.ensureInitialization();

    return subscribe({
      Subscription,
      subscriptionsByUUID,
      subscriptionsByProperty,
      properties,
      callback
    });
  },
  unsubscribe(subscriptionUUID) {
    unsubscribe({
      subscriptionUUID,
      subscriptionsByUUID,
      subscriptionsByProperty
    });
  }
};
