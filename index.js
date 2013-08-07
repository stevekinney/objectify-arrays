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
  if (!this.getHeader()) {
    this.setHeader(row);
  } else {
    data = {};
    this.getHeader().forEach(function(element, index){
      data[element] = row[index];
    });
  }
  
  if (data) { this.push(data); }
  
  callback();
};

ArrayObjectify.prototype.getHeader = function() {
  return this._header;
};

ArrayObjectify.prototype.setHeader = function(row) {
  this._header = row;
  this.emit('headers:received', row);
};
module.exports = ArrayObjectify;
