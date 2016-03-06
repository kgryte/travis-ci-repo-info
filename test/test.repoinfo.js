'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
var repoinfo = require( './../lib/repoinfo.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var data = require( './fixtures/data.json' );
var results = {
	'meta': {
		'total': 2,
		'success': 2,
		'failure': 0
	},
	'data': {
		'math-io/erf': data[ 0 ],
		'math-io/erfc': data[ 1 ]
	},
	'failures': {}
};


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof repoinfo, 'function', 'export is a function' );
	t.end();
});

tape( 'function throws an error if provided an invalid option', function test( t ) {
	t.throws( foo, TypeError, 'invalid options argument' );
	t.throws( bar, TypeError, 'invalid option' );
	t.end();

	function foo() {
		repoinfo( null, noop );
	}
	function bar() {
		repoinfo( {'repos':null}, noop );
	}
});

tape( 'function throws if provided a callback argument which is not a function', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{}
	];

	opts = getOpts();
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			repoinfo( opts, value );
		};
	}
});

tape( 'function throws if not provided repo slugs', function test( t ) {
	t.throws( foo, Error, 'requires repos' );
	t.end();

	function foo() {
		repoinfo( {'token':'1234'}, noop );
	}
});

tape( 'function returns an error to a provided callback if an error is encountered when fetching resources', function test( t ) {
	var repoinfo;
	var opts;

	repoinfo = proxyquire( './../lib/repoinfo.js', {
		'./factory.js': factory
	});

	opts = getOpts();
	repoinfo( opts, done );

	function factory( opts, clbk ) {
		return function repoinfo() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk({
					'status': 404,
					'message': 'beep'
				});
			}
		};
	}

	function done( error ) {
		t.equal( error.status, 404, 'equal status' );
		t.equal( error.message, 'beep', 'equal message' );
		t.end();
	}
});

tape( 'functions returns a resource hash containing resources to a provided callback', function test( t ) {
	var expected;
	var repoinfo;
	var opts;

	repoinfo = proxyquire( './../lib/repoinfo.js', {
		'./factory.js': factory
	});

	expected = results;

	opts = getOpts();
	repoinfo( opts, done );

	function factory( opts, clbk ) {
		return function repoinfo() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, results );
			}
		};
	}

	function done( error, results ) {
		t.deepEqual( results, expected, 'deep equal' );
		t.end();
	}
});
