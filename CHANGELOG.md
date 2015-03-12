# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][unreleased]
### Added
- CHANGELOG.md for project clarity.

## [1.0.0] - 2015-03-10
### Changed
- test/sourceMaps.js
  * gulp-sourcemaps doesn’t support stream mode, so we don’t need to test the result of Source Map in stream mode.
- README.md
  * 'Breaking Changes' section removed, as those changes are now 3 months old and are no longer surprising.


### Removed
- `cache` option -- this violated the 'do one thing well' principle of gulp.
- test/cache.js
  * No more `cache` option in the API means no need for those tests.