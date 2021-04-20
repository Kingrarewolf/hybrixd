/**
   * Keep all duplicate elements in an array of which there are many, removing all single, or less available entries.
   * @category Array/String
   * @param {Number} [amount=2] - Optional: Group amount above which to keep elements.
   * @example
   *  many             // input: ['g','l','o','l','l','s','s'], output: ['l','l','l','s','s']
   *  many 3           // input: ['g','l','o','l','l','s','s'], output: ['l','l','l'] - more than 3 entries
   */
exports.many = ydata => function (p, amount) {
  amount = amount || 1;
  let str;
  if (typeof ydata === 'string') {
    str = true;
    ydata = ydata.split('');
  }
  let result = [];
  for (let i = 0; i < ydata.length; i++) {
    let entries = 0;
    for (let j = 0; j < ydata.length; j++) {
      if (ydata[i] === ydata[j]) {
        entries++;
      }
    }
    if (entries > amount) {
      result.push(ydata[i]);
    }
  }
  if (str) {
    result = result.join('');
  }
  this.next(p, 0, result);
};

exports.tests = {
  many: [
    'data abcdefaba',
    'many 2',
    "flow 'aaa' 1 2",
    'done $OK',
    'fail'
  ]
};
