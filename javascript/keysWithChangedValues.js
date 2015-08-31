'use strict';

import unique from 'lodash/array/unique';

export default (oldParams, newParams) => {
  let oldKeys = Object.keys(oldParams);
  let newKeys = Object.keys(newParams);

  let allKeys = unique(oldKeys.concat(newKeys));

  return allKeys.filter(key => {
    let oldValue = oldParams[key];
    let newValue = newParams[key];

    /* handle NaN */
    if (oldValue !== oldValue && newValue !== newValue) {
      /* both oldValue and newValue equal NaN */
      return false;
    }

    return oldValue !== newValue;
  });
};
