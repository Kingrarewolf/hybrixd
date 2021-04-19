const modules = require('../../modules');

/**
   * Store a key value pair. When value is an object, it will be stored as a string.
   * @category Storage
   * @param {String} key - Key under which to store data
   * @param {Object} [value=data] - Value to store
   * @example
   * save storeDataStuff             // saves the data stream variable under key storeDataStuff
   * save myFavoriteColor 'blue'     // saves "blue" under key myFavoriteColor
   * save myObject {key:'storeme'}   // saves "{key:\"storeme\"}" under key myObject
   */
exports.save = data => function (p, key, value) {
  if (typeof value === 'undefined') value = data;
  const done = data => p.next(data);
  const fail = error => p.fail(error);
  if (typeof value !== 'string') value = JSON.stringify(value);
  modules.module.storage.main.save({done, fail}, {key: encodeURIComponent(key), value: value}); // TODO ugly global hack
};

exports.tests = {
  save: [
    'burn testSave',
    'save testSave 123',
    'seek testSave 1 2',
    'done $OK',
    'fail'
  ],
  work: [
    'burn testWork',
    'save testWork 123',
    'poke challenge ${.challenge}',
    'rout /e/storage/meta/testWork',
    'tran .pow',
    "rout '/e/storage/work/testWork/$'",
    'rout /e/storage/meta/testWork',
    'tran .expire',
    'flow null 2 1',
    'done $OK',
    'fail'
  ]

};
