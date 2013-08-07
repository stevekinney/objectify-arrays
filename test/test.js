/* globals describe, it */

var stream = require('../')(),
    assert = require('assert');

var data = [
  ['name', 'age', 'birthplace'],
  ['Bucu', '17', 'Queens'],
  ['Marley', '5', 'Brooklyn'],
  ['Paul', '71', 'Liverpool']
];

describe('Headers', function () {
  it('should emit an event on the first element', function (done) {
    stream.on('headers:received', function (row) {
      assert.ok(row);
      done();
    });
    stream.write(data[0]);
  });

  it('should be the same as the first row of the array', function () {
    assert.deepEqual(data[0], stream.getHeader());
  });

  it('should be applied to all future data', function (done) {
    stream.once('data', function (data) {
      assert.deepEqual(Object.keys(data), stream.getHeader());
      done();
    });
    stream.write(data[1]);
  });
});

describe('Data elements', function () {
  it('should be an object', function (done) {
    stream.once('data', function (data) {
      assert.equal(typeof data, typeof {});
      done();
    });
    stream.write(data[1]);
  });
});
