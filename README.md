# gulp-minify-css

[![Build Status](https://travis-ci.org/jonathanepollack/gulp-minify-css.svg?branch=master)](https://travis-ci.org/jonathanepollack/gulp-minify-css)
[![Build status](https://ci.appveyor.com/api/projects/status/eidg7ju694an2i74?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/gulp-minify-css)
[![Coverage Status](https://img.shields.io/coveralls/jonathanepollack/gulp-minify-css.svg)](https://coveralls.io/r/jonathanepollack/gulp-minify-css)

[gulp](http://gulpjs.com/) plugin to minify CSS, using [clean-css] 

## Regarding Issues

This is just a simple [gulp](https://github.com/gulpjs/gulp) plugin, which means it's nothing more than a thin wrapper around `clean-css`. If it looks like you are having CSS related issues, please contact [clean-css]. Only create a new issue if it looks like you're having a problem with the plugin itself.

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install --save-dev gulp-minify-css
```

## API

```javascript
var minifyCss = require('gulp-minify-css');
```

### minifyCss([*options*])

*options*: `Object`  
Return: `Object` ([stream.Tansform](https://nodejs.org/docs/latest/api/stream.html#stream_class_stream_transform))

Options are directly passed to [clean-css](https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-programmatically) so all clean-css options are available.

```javascript
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');

gulp.task('minify-css', function() {
  return gulp.src('styles/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});
```

[Source Maps](http://www.html5rocks.com/tutorials/developertools/sourcemaps/) can be generated by using [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps).

```javascript
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('minify-css', function() {
  return gulp.src('./src/*.css')
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
```

## LICENSE

(MIT License)

Copyright (c) 2013 Jonathan Pollack (<jonathanepollack@gmail.com>), Cloublabs Inc.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[clean-css]: https://github.com/jakubpawlowicz/clean-css
