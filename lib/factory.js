'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var copy = require( 'utils-copy' );
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );
var get = require( './get.js' );


// FACTORY //

/**
* FUNCTION: factory( options, clbk )
*	Returns a function for fetching repo info.
*
* @param {Object} options - function options
* @param {String[]} options.repos - Github repository slugs
* @param {String} [options.token] - Travis CI access token
* @param {String} [options.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Function} function for getting resources
*/
function factory( options, clbk ) {
	var opts;
	var err;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
	}
	/**
	* FUNCTION: repoinfo()
	*	Gets repo info.
	*
	* @returns {Void}
	*/
	return function repoinfo() {
		get( opts, done );
		/**
		* FUNCTION: done( error, results, info )
		*	Callback invoked after query completion.
		*
		* @private
		* @param {Error|Null} error - error object
		* @param {Object} results - query results
		* @returns {Void}
		*/
		function done( error, results ) {
			if ( error ) {
				return clbk( error );
			}
			clbk( null, results );
		} // end FUNCTION done()
	}; // end FUNCTION repoinfo()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;
