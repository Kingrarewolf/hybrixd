/**
   * Pick elements from an array or input string. Indexes, a range or selection array of indexes can be entered.
   * @category Array/String
   * @param {String|Array} [start] - Starting index to pick elements. When an array every individual number is used as an index.
   * @param {String} [end] - End range to pick elements.
   * @example
   * pick            // input: ['A','B','C'], output: 'A'
   * pick 1          // input: ['A','B','C'], output: 'B'
   * pick -1         // input: ['A','B','C'], output: 'C'
   * pick 1 3        // input: ['A','B','C'], output: ['B','C']
   * pick [1]        // input: ['A','B','C'], output: ['B']
   * pick [0,2]      // input: ['A','B','C'], output: ['A','C']
   */
exports.pick = ydata => function (p, start, end) {
  if (typeof ydata === 'number' || typeof ydata === 'boolean') ydata = String(ydata);

  if (typeof ydata !== 'string' && (typeof ydata !== 'object' || ydata === null)) {
    p.fail('pick: expects string, object or array data');
    return;
  }

  if (typeof start === 'number' && start < 0 && (typeof ydata === 'string' || ydata instanceof Array)) start = ydata.length + start;
  if (typeof end === 'number' && end < 0 && (typeof ydata === 'string' || ydata instanceof Array)) { end = ydata.length + end; }

  let result;
  if (typeof start === 'undefined' && typeof end === 'undefined') { // first elements
    result = ydata[0];
  } else if (typeof end === 'undefined') { // single index or array/multis selection
    if (typeof start === 'number' || typeof start === 'string') {
      result = ydata[start];
    } else if (start instanceof Array) { // array/multi select
      result = [];
      for (const index of start) {
        if (typeof ydata === 'object' || index >= 0) result.push(ydata[index]);
        else result.push(ydata[ydata.length + index]);
      }
      if (typeof ydata === 'string') result = result.join('');
    } else {
      p.fail('pick: expected string, number or array');
      return;
    }
  } else { // range
    if (typeof ydata === 'string') {
      result = ydata.substring(start, end);
    } else if (ydata instanceof Array) {
      result = ydata.splice(start, end - start);
    } else {
      p.fail('pick: range expects string or array data.');
      return;
    }
  }

  p.next(result);
};

exports.tests = {
  pick: [
    'data abcdef',
    'pick 2',
    'flow c 1 2',
    'done $OK',
    'fail'
  ],
  pick2: [
    'data abcdef',
    'pick -1',
    'flow f 1 2',
    'done $OK',
    'fail'
  ],
  pick3: [
    'data abcdef',
    'pick 1 3',
    'flow bc 1 2',
    'done $OK',
    'fail'
  ],
  pick4: [
    'data abcdef',
    'pick [1,3]',
    'flow bd 1 2',
    'done $OK',
    'fail'
  ],
  pick5: [
    'data [a,b,c,d,e,f]',
    'pick 2',
    'flow c 1 2',
    'done $OK',
    'fail'
  ],
  pick6: [
    'data [a,b,c,d,e,f]',
    'pick -1',
    'flow f 1 2',
    'done $OK',
    'fail'
  ],
  pick7: [
    'data [a,b,c,d,e,f]',
    'pick [1,3]',
    "flow '[\"b\",\"d\"]' 1 2",
    'done $OK',
    'fail'
  ],
  pick8: [
    'data {a:1,b:2,c:3}',
    'pick a',
    'flow 1 1 2',
    'done $OK',
    'fail'
  ],
  pick9: [
    'data {a:1,b:2,c:3}',
    'pick [a,c]',
    "flow '[1,3]' 1 2",
    'done $OK',
    'fail'
  ]
};
