'use strict';

// MODULES //

var tape = require( 'tape' );
var repoinfo = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof repoinfo, 'function', 'main export is a function' );
	t.end();
});

tape( 'module exports a factory method', function test( t ) {
	t.equal( typeof repoinfo.factory, 'function', 'export includes a factory method' );
	t.end();
});
