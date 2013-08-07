var Transform = require('stream').Transform,
    inherits = require('util').inherits;

function ArrayObjectify (options) {
  if (!(this instanceof ArrayObjectify)) {
    return new ArrayObjectify(options);
  }
  
  if (!options) { options = {}; }
  options.objectMode = true;
  
  Transform.call(this, options);
  
  this._header = null;
}

inherits(ArrayObjectify, Transform);

ArrayObjectify.prototype._transform = function (row, enc, callback) {
  var data;
  if (!this._header) {
    this._header = row;
    this.emit('headers:received', row);
  } else {
    data = {};
    this._header.forEach(function(element, index){
      data[element] = row[index];
    });
  }
  
  if (data) { this.push(data); }
  
  callback();
};

ArrayObjectify.prototype.header = function() {
  return this._header;
};

module.exports = ArrayObjectify;
