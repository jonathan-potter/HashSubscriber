'use strict';

const SUBSCRIPTIONS_BY_PROPERTY_PROTOTYPE = {

  subscriptions: {},

  add({property, subscription}) {
    let currentSubscriptions = this.subscriptions[property];
    
    if (!currentSubscriptions || currentSubscriptions.length === 0) {
      this.subscriptions[property] = {};
    }

    /* useing object like a set here */
    this.subscriptions[property][subscription.uuid] = true;
  },

  remove({property, subscription}) {
    let currentSubscriptions = this.subscriptions[property];

    if (!currentSubscriptions || currentSubscriptions.length === 0) {
      this.subscriptions[property] = [];
    }

    delete this.subscriptions[property][subscription.uuid];
  }

};

export default () => {
  return Object.create(SUBSCRIPTIONS_BY_PROPERTY_PROTOTYPE);
};

export { SUBSCRIPTIONS_BY_PROPERTY_PROTOTYPE };
