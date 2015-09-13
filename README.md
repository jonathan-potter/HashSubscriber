Hash Subscriber
========

###SUMMARY:
--------

[HashSubscriber](https://github.com/jonathan-potter/HashSubscriber) allows callbacks to be bound to specific changes within the browser's location hash. This will allow separate sections of your program to only listen for changes in the location hash that are important for their operation. This also means that hashchanges that aren't relevant can be ignored. 

##### Assumptions:
properties in the location hash are assumed to be organized in a key value format separated by '&'. This is similar to the typical query string.

###### example:
```
SomeWebsite.com/#booleanValue&key=value&anotherKey=anotherValue
```

### Operational Example:
```js
import HashSubscriber from 'HashSubscriber'

var callbackOne = function () { console.log('group one'); }
var callbackTwo = function () { console.log('group two'); }

/* subscribe group one */
var subscriptionOne = HashSubscriber.subscribe(['group', 'one'], callbackOne);

/* subscribe group two */
var subscriptionTwo = HashSubscriber.subscribe(['group', 'two'], callbackTwo);

/* prepare events which will simulate hashchange events */
/* event that will fire both subscribed callbacks */
var eventFiresBoth = new HashChangeEvent('hashchange', {oldURL: '#', newURL: '#group'});
/* event that will fire the callback for subscription one */
var eventFiresOne = new HashChangeEvent('hashchange', {oldURL: '#', newURL: '#one'});
/* event that will fire the callback for subscription two */
var eventFiresTwo = new HashChangeEvent('hashchange', {oldURL: '#', newURL: '#two'});

/* simulate a hashchange that both callbacks are subscribed to */
window.dispatchEvent(eventFiresBoth);
/*
  group one
  group two
*/

/* simulate a hashchange that only callback one is subscribed to*/
window.dispatchEvent(eventFiresOne);
/*
  group one
*/

/* simulate a hashchange that only callback two is subscribed to*/
window.dispatchEvent(eventFiresTwo);
/*
  group two
*/

/* remove subscription two */
HashSubscriber.unsubscribe(subscriptionTwo);

/* simulate the hashchange that both callbacks were subscribed to */
/* observer that callback two no longer fires */
window.dispatchEvent(eventFiresBoth);
/*
  group one
*/
```
