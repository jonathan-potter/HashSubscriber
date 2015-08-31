'use strict';

import subscribe from 'javascript/subscribe';
import Subscription from 'javascript/subscription';
import SubscriptionsByProperty from 'javascript/subscriptionsByProperty';

// (Subscription, subscriptions, subscriptionsByProperty, properties, callback) => {}
describe('subscribe', () => {
  let subscriptions, subscriptionsByProperty, testObject;

  beforeEach(() => {
    subscriptions = {};
    subscriptionsByProperty = SubscriptionsByProperty();

    testObject = { Subscription, subscriptions, subscriptionsByProperty};
  });

  it('generates a subscription object', () => {
    let properties = ['a-property'];
    let callback = () => {};

    spyOn(testObject, 'Subscription').and.returnValue({uuid: 'fake-uuid'});
    spyOn(subscriptionsByProperty, 'add');
    subscribe(
      testObject.Subscription,
      testObject.subscriptions,
      testObject.subscriptionsByProperty,
      properties,
      callback
    );

    expect(testObject.Subscription).toHaveBeenCalled();
  });

  it("registers the generated subscription in the subscriptions object by it's uuid", () => {
    let properties = ['a-property'];
    let callback = () => {};

    let subscription = {uuid: 'fake-uuid'};
    spyOn(testObject, 'Subscription').and.returnValue(subscription);
    spyOn(subscriptionsByProperty, 'add');
    subscribe(
      testObject.Subscription,
      testObject.subscriptions,
      testObject.subscriptionsByProperty,
      properties,
      callback
    );

    expect(testObject.subscriptions['fake-uuid']).toEqual(subscription);
  });

  it("registers the generated subscription in the subscriptions object by it's uuid", () => {
    let properties = ['a-property'];
    let callback = () => {};

    let subscription = {uuid: 'fake-uuid'};
    spyOn(testObject, 'Subscription').and.returnValue(subscription);
    subscribe(
      testObject.Subscription,
      testObject.subscriptions,
      testObject.subscriptionsByProperty,
      properties,
      callback
    );

    expect(subscriptionsByProperty.subscriptions['a-property']).toEqual({'fake-uuid': true});
  });
});
