'use strict';

import subscribe from 'javascript/subscribe';
import Subscription from 'javascript/subscription';
import SubscriptionsByProperty from 'javascript/subscriptionsByProperty';

// (Subscription, subscriptions, subscriptionsByProperty, properties, callback) => {}
describe('subscribe', () => {
  let subscriptionsByUUID, subscriptionsByProperty, testObject;

  beforeEach(() => {
    subscriptionsByUUID = {};
    subscriptionsByProperty = SubscriptionsByProperty();

    testObject = { Subscription, subscriptionsByUUID, subscriptionsByProperty};
  });

  it('generates a subscription object', () => {
    let properties = ['a-property'];
    let callback = () => {};

    spyOn(testObject, 'Subscription').and.returnValue({uuid: 'fake-uuid'});
    spyOn(subscriptionsByProperty, 'add');
    subscribe({
      Subscription: testObject.Subscription,
      subscriptionsByUUID: testObject.subscriptionsByUUID,
      subscriptionsByProperty: testObject.subscriptionsByProperty,
      properties: properties,
      callback: callback
    });

    expect(testObject.Subscription).toHaveBeenCalled();
  });

  it("registers the generated subscription in the subscriptions object by it's uuid", () => {
    let properties = ['a-property'];
    let callback = () => {};

    let subscription = {uuid: 'fake-uuid'};
    spyOn(testObject, 'Subscription').and.returnValue(subscription);
    spyOn(subscriptionsByProperty, 'add');
    subscribe({
      Subscription: testObject.Subscription,
      subscriptionsByUUID: testObject.subscriptionsByUUID,
      subscriptionsByProperty: testObject.subscriptionsByProperty,
      properties: properties,
      callback: callback
    });

    expect(testObject.subscriptionsByUUID['fake-uuid']).toEqual(subscription);
  });

  it("registers the generated subscription in the subscriptions object by it's uuid", () => {
    let properties = ['a-property'];
    let callback = () => {};

    let subscription = {uuid: 'fake-uuid'};
    spyOn(testObject, 'Subscription').and.returnValue(subscription);
    subscribe({
      Subscription: testObject.Subscription,
      subscriptionsByUUID: testObject.subscriptionsByUUID,
      subscriptionsByProperty: testObject.subscriptionsByProperty,
      properties: properties,
      callback: callback
    });

    expect(subscriptionsByProperty.subscriptions['a-property']).toEqual({'fake-uuid': true});
  });
});
