'use strict';

import HashSubscriber from 'javascript/api';
import subscribe from 'javascript/subscribe';

describe('HashSubscriber', () => {
  describe('ensureInitialization', () => {
    beforeEach(() => {
      spyOn(HashSubscriber, 'init');
    });

    it('calls init function when not initialized', () => {
      HashSubscriber.initialized = false;

      HashSubscriber.ensureInitialization();

      expect(HashSubscriber.init).toHaveBeenCalled();
    });

    it('calls init function when initialized', () => {
      HashSubscriber.initialized = true;

      HashSubscriber.ensureInitialization();

      expect(HashSubscriber.init).not.toHaveBeenCalled();
    });
  });

  describe('init', () => {
    beforeEach(() => {
      spyOn(window, 'addEventListener');
    });

    it('adds hashChangeHandler as an event handler for hashchange', () => {
      HashSubscriber.init();

      expect(window.addEventListener).toHaveBeenCalled();
    });
  });

  describe('subscribe', () => {
    beforeEach(() => {
      spyOn(HashSubscriber, 'ensureInitialization');
    });

    it('ensures initialization', () => {
      let somePropertyNames = ['some', 'property', 'names'];
      let aCallback = () => {};

      HashSubscriber.subscribe(somePropertyNames, aCallback);

      expect(HashSubscriber.ensureInitialization).toHaveBeenCalled();
    });

    xit('calls subscribe', () => {
      /* i'm not sure how I should test this. */
    });
  });

  describe('unsubscribe', () => {
    xit('calls unsubscribe', () => {
      /* i'm not sure how I should test this. */
    });
  });
});
