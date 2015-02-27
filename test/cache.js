'use strict';

var path = require('path');

var bufferstream = require('simple-bufferstream');
var expect = require('chai').expect;
var File = require('vinyl');
var proxyquire = require('proxyquire');
var cacheStub = require('memory-cache');

var minifyCSS = proxyquire('../', {'memory-cache': cacheStub});

require('mocha');

cacheStub.debug(false);

var rawContents = [
  '/*! foo */',
  '/* bar */',
  'a { color: red; }',
  '/*! baz */\n'
].join('\n');

var compiled = '/*! foo */a{color:red}/*! baz */';

describe('gulp-minify-css caching', function() {
  var filename = path.join(__dirname, './fixture/index.css');
  var options = {
    cache: true,
    keepBreaks: false,
    processImport: true
  };
  var p = function(cb) {
    minifyCSS(options)
    .on('data', cb)
    .end(new File({
      path: filename,
      contents: new Buffer(rawContents)
    }));
  };

  describe('with buffers', function() {
    it('should not use the cache if option is not given', function(done) {
      minifyCSS({})
      .on('error', done)
      .on('finish', function() {
        expect(cacheStub.size()).to.be.equal(0);
        cacheStub.clear();
        done();
      })
      .end(new File({contents: new Buffer(rawContents)}));
    });

    it('should use the cache if option is given', function(done) {
      minifyCSS(options)
      .on('error', done)
      .on('finish', function() {
        expect(cacheStub.size()).to.be.equal(1);
        expect(cacheStub.get(filename)).to.deep.equal({
          raw: rawContents,
          minified: {
            styles: compiled,
            stats: {},
            errors: [],
            warnings: []
          },
          options: options
        });
        cacheStub.clear();
        done();
      })
      .end(new File({
        path: filename,
        contents: new Buffer(rawContents)
      }));
    });

    it('should return the cached content if the cache is used', function(done) {
      p(function(file) {
        expect(String(file.contents)).to.be.equal(compiled);
        cacheStub.get(filename).minified = {styles: 'a{}'};

        p(function(cachedFile) {
          expect(String(cachedFile.contents)).to.be.equal('a{}');
          cacheStub.clear();
          done();
        });
      });
    });
  });

  describe('with streams', function() {
    it('should use the cache if option is given', function(done) {
      minifyCSS(options)
      .on('error', done)
      .on('data', function(file) {
        file.contents.on('finish', function() {
          process.nextTick(function() {
            expect(cacheStub.size()).to.be.equal(1);
            expect(cacheStub.get(filename)).to.deep.equal({
              raw: rawContents,
              minified: {
                styles: compiled,
                stats: {},
                errors: [],
                warnings: []
              },
              options: options
            });
            cacheStub.clear();
            done();
          });
        });
      })
      .end(new File({
        path: filename,
        contents: bufferstream(new Buffer(rawContents))
      }));
    });

    it('should return the cached content if the cache is used', function(done) {
      p(function(file) {
        expect(String(file.contents)).to.be.equal(compiled);
        cacheStub.get(filename).minified.styles = 'cached data';

        p(function(cachedFile) {
          expect(String(cachedFile.contents)).to.be.equal('cached data');
          cacheStub.clear();
          done();
        });
      });
    });
  });
});
