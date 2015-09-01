'use strict';

const SUBSCRIPTIONS_BY_PROPERTY_PROTOTYPE = {
  add({property, subscription}) {
    let currentSubscriptions = this.subscriptions[property];
    
    if (!currentSubscriptions || Object.keys(currentSubscriptions).length === 0) {
      this.subscriptions[property] = {};
    }

    /* useing object like a set here */
    this.subscriptions[property][subscription.uuid] = true;
  },

  remove({property, subscription}) {
    let currentSubscriptions = this.subscriptions[property];

    if (!currentSubscriptions || Object.keys(currentSubscriptions).length === 0) {
      this.subscriptions[property] = {};
    }

    delete this.subscriptions[property][subscription.uuid];
  }

};

export default () => {
  let subscriptionsByProperty = Object.create(SUBSCRIPTIONS_BY_PROPERTY_PROTOTYPE);

  subscriptionsByProperty.subscriptions = {};

  return subscriptionsByProperty
};

export { SUBSCRIPTIONS_BY_PROPERTY_PROTOTYPE };
