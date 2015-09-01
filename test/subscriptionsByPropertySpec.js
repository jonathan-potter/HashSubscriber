'use strict';

import SubscriptionsByProperty from 'javascript/subscriptionsByProperty';

const property1 = 'property1';

const subscription1 = { uuid: 'subscription1' };
const subscription2 = { uuid: 'subscription2' };

describe('subscribe', () => {
  let subscriptionsByProperty;

  beforeEach(() => {
    subscriptionsByProperty = SubscriptionsByProperty();
  });

  describe('with no properties or subscriptions', () => {
    it('has no subscriptions registered', () => {
      expect(subscriptionsByProperty.subscriptions).toEqual({});
    });

    describe('#add', () => {
      it('registers a subscription to a property', () => {
        subscriptionsByProperty.add({
          property: property1,
          subscription: subscription1
        });

        expect(subscriptionsByProperty.subscriptions).toEqual({
          'property1': { 'subscription1': true }
        });
      });
    });

    describe('#remove', () => {
      it('adds the property without any subscriptions', () => {
        subscriptionsByProperty.remove({
          property: property1,
          subscription: subscription1
        });

        expect(subscriptionsByProperty.subscriptions).toEqual({
          property1: {}
        });
      });
    });
  });

  describe('with properties but not subscriptions', () => {
    beforeEach(() => {
      subscriptionsByProperty.subscriptions = {
        'property1': {},
        'property2': {},
        'property3': {},
        'property4': {}
      };
    });

    describe('#add', () => {
      it('registers a subscription to a property', () => {
        subscriptionsByProperty.add({
          property: property1,
          subscription: subscription1
        });

        expect(subscriptionsByProperty.subscriptions).toEqual({
          'property1': { 'subscription1': true },
          'property2': {},
          'property3': {},
          'property4': {}
        });
      });
    });

    describe('#remove', () => {
      it('has no effect on properties or subscriptions', () => {
        subscriptionsByProperty.remove({
          property: property1,
          subscription: subscription1
        });

        expect(subscriptionsByProperty.subscriptions).toEqual({
          'property1': {},
          'property2': {},
          'property3': {},
          'property4': {}
        });
      });
    });
  });

  describe('with properties and subscriptions', () => {
    beforeEach(() => {
      subscriptionsByProperty.subscriptions = {
        'property1': { 'subscription1': true },
        'property2': { 'subscription2': true },
        'property3': { 'subscription3': true },
        'property4': { 'subscription4': true }
      };
    });

    describe('#add', () => {
      it('registers a subscription to a property', () => {
        subscriptionsByProperty.add({
          property: property1,
          subscription: subscription2
        });

        expect(subscriptionsByProperty.subscriptions).toEqual({
          'property1': { 'subscription1': true, 'subscription2': true },
          'property2': { 'subscription2': true },
          'property3': { 'subscription3': true },
          'property4': { 'subscription4': true }
        });
      });
    });

    describe('#remove', () => {
      it('removes the given subscription from the given property', () => {
        subscriptionsByProperty.remove({
          property: property1,
          subscription: subscription1
        });

        expect(subscriptionsByProperty.subscriptions).toEqual({
          'property1': {},
          'property2': { 'subscription2': true },
          'property3': { 'subscription3': true },
          'property4': { 'subscription4': true }
        });
      });
    });
  });
});
