Repository Info
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Get [repository info][travis-repo-info] for one or more repositories.


## Installation

``` bash
$ npm install travis-ci-repo-info
```


## Usage

``` javascript
var repoinfo = require( 'travis-ci-repo-info' );
```

<a name="repoinfo"></a>
#### repoinfo( options, clbk )

Gets [repository info][travis-repo-info] for one or more repositories.

``` javascript
var opts = {
	'repos': [
		'math-io/erf',
		'math-io/erfc',
		'unknown/repo'
	]
};

repoinfo( opts, clbk );

function clbk( error, results ) {
	if ( error ) {
		throw new Error( error.message );
	}
	console.dir( results );
	/*
		{
			"meta": {
				"total": 3,
				"success": 2,
				"failure": 1
			},
			"data": {
				"math-io/erf": {...},
				"math-io/erfc": {...}
			},
			"failures": {
				"unknown/repo": "Not Found"
			}
		}
	*/
}
```

The `function` accepts the following `options`:
*	__repos__: `array` of Github repository slugs (*required*). A `slug` should obey the format `:owner/:repo`.
*	__token__: Travis CI [access token][travis-token].

To [authenticate][travis-token] with Travis CI, set the [`token`][travis-token] option.

``` javascript
var opts = {
	'repos': ['kgryte/utils-copy'],
	'token': 'tkjorjk34ek3nj4!'
};

repoinfo( opts, clbk );
```


#### repoinfo.factory( options, clbk )

Creates a reusable `function`.

``` javascript
var opts = {
	'repos': [
		'math-io/gamma',
		'math-io/factorial'
	],
	'token': 'tkjorjk34ek3nj4!'
};

var get = repoinfo.factory( opts, clbk );

get();
get();
get();
// ...
```

The factory method accepts the same `options` as [`repoinfo()`](#repoinfo).


## Notes

*	If the module encounters an application-level `error` (e.g., no network connection, etc), that `error` is returned immediately to the provided `callback`.
*	If the module encounters a downstream `error` (e.g., timeout, reset connection, etc), that `error` is included in the returned results under the `failures` field.


---
## Examples

``` javascript
var repoinfo = require( 'travis-ci-repo-info' );

var opts = {
	'repos': [
		'math-io/erf',
		'math-io/erfc',
		'math-io/erfinv'
	]
};

repoinfo( opts, clbk );

function clbk( error, results ) {
	if ( error ) {
		throw new Error( error.message );
	}
	console.dir( results );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g travis-ci-repo-info
```


### Usage

``` bash
Usage: travisrepoinfo [options] slug1 slug2 ...

Options:

  -h,  --help               Print this message.
  -V,  --version            Print the package version.
       --token token        Travis CI access token.
```


### Notes

*	In addition to the [`token`][travis-token] option, the [token][travis-token] may be specified by a [`TRAVISCI_TOKEN`][travis-token] environment variable. The command-line option __always__ takes precedence.
*	If a repository's [info][travis-repo-info] is successfully resolved, the repository info is written to `stdout`.
*	If a repository's [info][travis-repo-info] cannot be resolved due to a downstream `error` (failure), the repository `slug` (and its associated `error`) is written to `sterr`.
*	Output order is __not__ guaranteed to match input order.


### Examples

Setting the access [token][travis-token] using the command-line option:

``` bash
$ DEBUG=* travisrepoinfo --token <token> math-io/erfinv
# => {...}
```

Setting the access [token][travis-token] using an environment variable:

``` bash
$ DEBUG=* TRAVISCI_TOKEN=<token> travisrepoinfo math-io/erfinv
# => {...}
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ DEBUG=* ./node_modules/.bin/travisrepoinfo --token <token> math-io/erfinv
# => {...}
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ DEBUG=* node ./bin/cli --token <token> math-io/erfinv
# => {...}
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/travis-ci-repo-info.svg
[npm-url]: https://npmjs.org/package/travis-ci-repo-info

[build-image]: http://img.shields.io/travis/kgryte/travis-ci-repo-info/master.svg
[build-url]: https://travis-ci.org/kgryte/travis-ci-repo-info

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/travis-ci-repo-info/master.svg
[coverage-url]: https://codecov.io/github/kgryte/travis-ci-repo-info?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/travis-ci-repo-info.svg
[dependencies-url]: https://david-dm.org/kgryte/travis-ci-repo-info

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/travis-ci-repo-info.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/travis-ci-repo-info

[github-issues-image]: http://img.shields.io/github/issues/kgryte/travis-ci-repo-info.svg
[github-issues-url]: https://github.com/kgryte/travis-ci-repo-info/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[travis-repo-info]: https://docs.travis-ci.com/api?http#repositories
[travis-token]: https://github.com/kgryte/travis-ci-access-token
