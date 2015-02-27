'use strict';

var bufferstream = require('simple-bufferstream');
var expect = require('chai').expect;
var PluginError = require('gulp-util').PluginError;
var minifyCSS = require('../');
var File = require('vinyl');

require('mocha');

var fixture = [
  '/*! foo */',
  '/* bar */',
  'a { color: red; }',
  '/*! baz */\n'
].join('\n');

var expected = [
  '/*! foo */',
  'a{color:red}'
].join('\n');

describe('gulp-minify-css minification', function() {
  var opts = {
    keepSpecialComments: 1,
    keepBreaks: true
  };

  describe('with buffers', function() {
    it('should minify my files', function(done) {
      minifyCSS(opts)
      .on('error', done)
      .on('data', function(file) {
        expect(String(file.contents)).to.be.equal(expected);
        done();
      })
      .end(new File({contents: new Buffer(fixture)}));
    });
  });

  describe('with streams', function() {
    it('should minify my files', function(done) {
      minifyCSS(opts)
      .on('error', done)
      .on('data', function(file) {
        file.contents.on('data', function(data) {
          expect(file.isStream()).to.be.equal(true);
          expect(String(data)).to.be.equal(expected);
          done();
        });
      })
      .end(new File({contents: bufferstream(new Buffer(fixture))}));
    });
  });

  describe('with external files', function() {
    it('should minify include external files', function(done) {
      minifyCSS()
      .on('error', done)
      .on('data', function(file) {
        expect(String(file.contents)).to.be.equal('b{color:green}');
        done();
      })
      .end(new File({
        path: 'test/fixture/foo/bar/importer.css',
        contents: new Buffer('@import url("../../import.css");')
      }));
    });
  });

  describe('with errors', function() {
    it('should minify include external files', function(done) {
      minifyCSS()
      .on('error', function(err) {
        expect(err).to.be.instanceOf(PluginError);
        done();
      })
      .end(new File({
        contents: new Buffer('@import url("../../import.css");')
      }));
    });
  });
});
