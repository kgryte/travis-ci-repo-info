'use strict';

// MODULES //

var debug = require( 'debug' )( 'travis-ci-repo-info:get' );
var request = require( 'travis-ci-get' );


// VARIABLES //

var NUM_CONCURRENT_REQUESTS = 5; // FIXME: heuristic


// GET //

/**
* FUNCTION: get( opts, clbk )
*	Get resources.
*
* @param {Object} opts - options
* @param {Function} clbk - callback to invoke after getting resources
* @returns {Void}
*/
function get( opts, clbk ) {
	var scount;
	var fcount;
	var count;
	var repos;
	var out;
	var idx;
	var len;
	var i;

	// Output data store:
	out = {};
	out.meta = {};
	out.data = {};
	out.failures = {};

	// Number of completed requests:
	count = 0;
	scount = 0; // success
	fcount = 0; // failures

	// Request id:
	idx = 0;

	repos = opts.repos;
	len = repos.length;

	debug( 'Number of repos: %d.', len );
	out.meta.total = len;

	debug( 'Beginning queries...' );
	for ( i = 0; i < NUM_CONCURRENT_REQUESTS; i++ ) {
		next();
	}
	/**
	* FUNCTION: next()
	*	Requests resource data for the next item in the queue. Once requests for all desired resources have completed, invokes the provided callback.
	*
	* @private
	* @returns {Void}
	*/
	function next() {
		var r;
		if ( count === len ) {
			debug( 'Finished all queries.' );
			out.meta.success = scount;
			out.meta.failure = fcount;
			return clbk( null, out );
		}
		if ( idx < len ) {
			r = repos[ idx ];
			debug( 'Querying for `%s` (%d).', r, idx );
			opts.pathname = '/repos/' + r;
			request( opts, onResponse( r, idx ) );
			idx += 1;
		}
	} // end FUNCTION next()

	/**
	* FUNCTION: onResponse( slug, idx )
	*	Returns a response callback.
	*
	* @private
	* @param {String} slug - repository slug
	* @param {Number} idx - request index
	* @returns {Function} response callback
	*/
	function onResponse( slug, idx ) {
		/**
		* FUNCTION: onResponse( error, details )
		*	Callback invoked upon receiving a request response.
		*
		* @private
		* @param {Error|Null} error - error object
		* @param {Object} details - response data
		* @returns {Void}
		*/
		return function onResponse( error, details ) {
			debug( 'Response received for `%s` (%d).', slug, idx );
			if ( arguments.length === 1 ) {
				debug( 'Encountered an application-level error for `%s` (%d): %s', slug, idx, error.message );
				return clbk( error );
			}
			if ( error ) {
				debug( 'Failed to resolve `%s` (%d): %s', slug, idx, error.message );
				out.failures[ slug ] = error.message;
				fcount += 1;
			} else {
				debug( 'Successfully resolved `%s` (%d).', slug, idx );
				out.data[ slug ] = details;
				scount += 1;
			}
			count += 1;
			debug( 'Request %d of %d complete.', count, len );
			next();
		}; // end FUNCTION onResponse()
	} // end FUNCTION onResponse()
} // end FUNCTION get()


// EXPORTS //

module.exports = get;
