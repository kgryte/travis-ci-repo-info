'use strict';

// MODULES //

var factory = require( './factory.js' );


// REPO INFO //

/**
* FUNCTION: repoinfo( opts, clbk )
*	Gets repo info.
*
* @param {Object} opts - function options
* @param {String[]} opts.repos - Github repository slugs
* @param {String} [opts.token] - Travis CI access token
* @param {String} [opts.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Void}
*/
function repoinfo( opts, clbk ) {
	factory( opts, clbk )();
} // end FUNCTION repoinfo()


// EXPORTS //

module.exports = repoinfo;
