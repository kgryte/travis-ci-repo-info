'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );
var isStringArray = require( 'validate.io-string-primitive-array' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String[]} options.repos - Github repository slugs
* @param {String} [options.token] - Travis CI access token
* @param {String} [options.useragent] - user agent string
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	opts.repos = options.repos;
	if ( !isStringArray( opts.repos ) ) {
		return new TypeError( 'invalid option. `repos` option must be a string array. Option: `' + opts.repos + '`.' );
	}
	if ( options.hasOwnProperty( 'token' ) ) {
		opts.token = options.token;
		if ( !isString( opts.token ) ) {
			return new TypeError( 'invalid option. `token` option must be a string primitive. Option: `' + opts.token + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'useragent' ) ) {
		opts.useragent = options.useragent;
		if ( !isString( opts.useragent ) ) {
			return new TypeError( 'invalid option. `useragent` option must be a string primitive. Option: `' + opts.useragent + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
