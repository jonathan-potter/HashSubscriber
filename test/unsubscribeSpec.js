'use strict';

import subscribe from 'javascript/subscribe';
import Subscription from 'javascript/subscription';
import SubscriptionsByProperty from 'javascript/subscriptionsByProperty';
import unsubscribe from 'javascript/unsubscribe';

const propertyGroupOne = ['this-is-the-first', 'group'];
const propertyGroupTwo = ['this-is-the-second', 'group'];

const callbackOne = () => {};
const callbackTwo = () => {};

// (subscription, subscriptionsByUUID, subscriptionsByProperty) => {}
describe('unsubscribe', () => {
  let subscriptionsByUUID, subscriptionsByProperty;

  let subscriptionOneUUID, subscriptionTwoUUID;
  beforeEach(() => {
    subscriptionsByUUID = {};
    subscriptionsByProperty = SubscriptionsByProperty();
    
    subscriptionOneUUID = subscribe({
      Subscription: Subscription,
      subscriptionsByUUID: subscriptionsByUUID,
      subscriptionsByProperty: subscriptionsByProperty,
      properties: propertyGroupOne,
      callback: callbackOne
    });
    
    subscriptionTwoUUID = subscribe({
      Subscription: Subscription,
      subscriptionsByUUID: subscriptionsByUUID,
      subscriptionsByProperty: subscriptionsByProperty,
      properties: propertyGroupTwo,
      callback: callbackTwo
    });
  });

  it("removes the given subscription from subscriptionsByUUID when the subscription is active", () => {
    expect(Object.keys(subscriptionsByUUID).length).toEqual(2);

    unsubscribe({
      subscriptionUUID: subscriptionOneUUID,
      subscriptionsByUUID: subscriptionsByUUID,
      subscriptionsByProperty: subscriptionsByProperty
    });

    expect(Object.keys(subscriptionsByUUID).length).toEqual(1);
  });

  it("does nothing to subscriptionsByUUID if the given subscription is not active", () => {
    expect(Object.keys(subscriptionsByUUID).length).toEqual(2);

    unsubscribe({
      subscriptionUUID: 'not-a-valid-uuid',
      subscriptionsByUUID: subscriptionsByUUID,
      subscriptionsByProperty: subscriptionsByProperty
    });

    expect(Object.keys(subscriptionsByUUID).length).toEqual(2);
  });

  it("removes references to the given subscriptionUUID in subscriptionsByProperty", () => {
    expect(subscriptionsByProperty.subscriptions).toEqual({
      'this-is-the-first': arrayToSetHash([subscriptionOneUUID]),
      'this-is-the-second': arrayToSetHash([subscriptionTwoUUID]),
      'group': arrayToSetHash([subscriptionOneUUID, subscriptionTwoUUID])
    });

    unsubscribe({
      subscriptionUUID: subscriptionOneUUID,
      subscriptionsByUUID: subscriptionsByUUID,
      subscriptionsByProperty: subscriptionsByProperty
    });

    expect(subscriptionsByProperty.subscriptions).toEqual({
      'this-is-the-first': arrayToSetHash([]),
      'this-is-the-second': arrayToSetHash([subscriptionTwoUUID]),
      'group': arrayToSetHash([subscriptionTwoUUID])
    });
  });
});

function arrayToSetHash(array) {
  return array.reduce((setHash, key) => {
    setHash[key] = true;

    return setHash;
  }, {});
}
