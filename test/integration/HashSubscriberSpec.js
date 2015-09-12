'use strict';

import HashSubscriber from 'javascript/api';

const propertyGroupOne = ['group', 'one'];
const propertyGroupTwo = ['group', 'two'];

const callbacks = {
  one: () => {},
  two: () => {}
};

let subscriptionOneUUID, subscriptionTwoUUID;
describe('HashSubscriber', () => {
  beforeEach(() => {
    spyOn(callbacks, 'one');
    spyOn(callbacks, 'two');

    subscriptionOneUUID = HashSubscriber.subscribe(propertyGroupOne, callbacks.one);
    subscriptionTwoUUID = HashSubscriber.subscribe(propertyGroupTwo, callbacks.two);
  });

  xit('fires both callbacks when a shared property is changed', () => {
    /* phantomJS doen'st like new HashChangeEvent(...) :( need to figure this out */
    /* filling out these tests anyways so proper operation is documented */
    let hashchangeEvent = new HashChangeEvent('hashchange', {oldURL: '#', newURL: '#group'});
    window.dispatchEvent(hashchangeEvent);

    expect(callbacks.one.calls.count()).toEqual(1);
    expect(callbacks.two.calls.count()).toEqual(1);
  });

  xit('fires one callback when a property from a single subscription is changed', () => {
    /* phantomJS doen'st like new HashChangeEvent(...) :( need to figure this out */
    /* filling out these tests anyways so proper operation is documented */
    let hashchangeEvent = new HashChangeEvent('hashchange', {oldURL: '#', newURL: '#one'});
    window.dispatchEvent(hashchangeEvent);

    expect(callbacks.one.calls.count()).toEqual(1);
    expect(callbacks.two.calls.count()).toEqual(0);
  });

  xit("doesn't fire events that have been unsubscribed", () => {
    HashSubscriber.subscribe(subscriptionOneUUID);

    /* phantomJS doen'st like new HashChangeEvent(...) :( need to figure this out */
    /* filling out these tests anyways so proper operation is documented */
    let hashchangeEvent = new HashChangeEvent('hashchange', {oldURL: '#', newURL: '#group'});
    window.dispatchEvent(hashchangeEvent);

    expect(callbacks.one.calls.count()).toEqual(0);
    expect(callbacks.two.calls.count()).toEqual(1);
  });
});
