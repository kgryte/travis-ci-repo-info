'use strict';

var repoinfo = require( './../lib' );

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
