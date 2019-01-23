/** ****************************************************************************************************
 * File: index.test.js
 * Project: lightmap
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 11-Jun-2018
 *******************************************************************************************************/
'use strict';

const
	chai        = require( 'chai' ),
	expect      = chai.expect,
	LightMap    = require( '../index' ),
	{ version } = require( '../package' );

describe( 'LightMap', () => {
	
	it( 'LightMap.filter should pass keys and values',
		() => {
			const _ = new LightMap();
			let k, v, self;
			
			_.set( 'key', 'value' );
			
			_.filter(
				( _v, _k, _self ) => {
					v    = _v;
					k    = _k;
					self = _self;
				}
			);
			
			expect( k ).to.eq( 'key' );
			expect( v ).to.eq( 'value' );
			expect( self instanceof LightMap ).to.eq( true );
		}
	);
	
	it( 'LightMap.filter should return new LightMap of filtered items',
		() => {
			const _ = new LightMap();
			_.set( 'key', 'value' );
			_.set( 'key1', 'value1' );
			
			const result = _.filter(
				( v, k ) => k === 'key'
			);
			
			expect( result instanceof LightMap ).to.eq( true );
			expect( result.has( 'key' ) ).to.eq( true );
			expect( result.get( 'key' ) ).to.eq( 'value' );
			expect( result.has( 'key1' ) ).to.eq( false );
			expect( result.get( 'key1' ) ).to.eq( undefined );
			expect( _.has( 'key1' ) ).to.eq( true );
			expect( _.get( 'key1' ) ).to.eq( 'value1' );
		}
	);
	
	it( 'LightMap.map should pass keys and values',
		() => {
			const _ = new LightMap();
			let k, v, self;
			
			_.set( 'key', 'value' );
			
			_.map(
				( _v, _k, _self ) => {
					v    = _v;
					k    = _k;
					self = _self;
				}
			);
			
			expect( k ).to.eq( 'key' );
			expect( v ).to.eq( 'value' );
			expect( self instanceof LightMap ).to.eq( true );
		}
	);
	
	it( 'LightMap.map should return new LightMap of mapped items',
		() => {
			const _ = new LightMap();
			_.set( 'key', 'value' );
			
			const result = _.map(
				( v, k ) => [ k + 1, v + 1 ]
			);
			
			expect( result instanceof LightMap ).to.eq( true );
			expect( _.get( 'key' ) ).to.eq( 'value' );
			expect( result.get( 'key1' ) ).to.eq( 'value1' );
		}
	);
	
	it( 'LightMap.reduce should pass return item, keys, and values',
		() => {
			const _ = new LightMap();
			let r, k, v, key, self;
			
			_.set( 'key', 'value' );
			
			_.reduce(
				( _r, [ _k, _v ], _key, _self ) => {
					r    = _r;
					k    = _k;
					v    = _v;
					key  = _key;
					self = _self;
				}, 'test'
			);
			
			expect( r ).to.eq( 'test' );
			expect( k ).to.eq( 'key' );
			expect( v ).to.eq( 'value' );
			expect( key ).to.eq( 'key' );
			expect( self instanceof LightMap ).to.eq( true );
		}
	);
	
	it( 'LightMap.reduce should return string of keys and values',
		() => {
			const _ = new LightMap();
			_.set( 'key', 'value' );
			
			const result = _.reduce(
				( r, [ k, v ] ) => {
					r += `Key: ${ k }\n`;
					r += `Value: ${ v }\n`;
					return r;
				}, ''
			);
			
			expect( result ).to.eq( 'Key: key\nValue: value\n' );
		}
	);
	
	it( 'LightMap.find should pass value, key, and the original iterator',
		() => {
			const _ = new LightMap();
			let k, v, self;
			
			_.set( 'key', 'value' );
			
			_.find(
				( _v, _k, _self ) => {
					v    = _v;
					k    = _k;
					self = _self;
				}
			);
			
			expect( k ).to.eq( 'key' );
			expect( v ).to.eq( 'value' );
			expect( self instanceof LightMap ).to.eq( true );
		}
	);
	
	it( 'LightMap.find should return a single tuple pair of that match the condition',
		() => {
			const _ = new LightMap();
			_.set( 'key', 'value' );
			_.set( 'key1', 'value' );
			_.set( 'key2', 'value2' );
			
			const result = _.find(
				( v, k ) => v === 'value' && k === 'key'
			);
			
			expect( Array.isArray( result ) ).to.eq( true );
			expect( result.length ).to.eq( 2 );
			expect( result[ 0 ] ).to.eq( 'key' );
			expect( result[ 1 ] ).to.eq( 'value' );
		}
	);
	
	it( 'LightMap.findAll should pass value, key, and the original iterator',
		() => {
			const _ = new LightMap();
			let k, v, self;
			
			_.set( 'key', 'value' );
			
			_.findAll(
				( _v, _k, _self ) => {
					v    = _v;
					k    = _k;
					self = _self;
				}
			);
			
			expect( k ).to.eq( 'key' );
			expect( v ).to.eq( 'value' );
			expect( self instanceof LightMap ).to.eq( true );
		}
	);
	
	it( 'LightMap.findAll should return a new LightMap of items that match the condition',
		() => {
			const _ = new LightMap();
			_.set( 'key', 'value' );
			_.set( 'key1', 'value' );
			_.set( 'key2', 'value2' );
			
			const result = _.findAll(
				v => v === 'value'
			);
			
			expect( result instanceof LightMap ).to.eq( true );
			expect( result.size ).to.eq( 2 );
			expect( result.get( 'key' ) ).to.eq( 'value' );
			expect( result.get( 'key1' ) ).to.eq( 'value' );
		}
	);
	
	
	it( 'LightMap.sortKeys should sort keys alphanumerically',
		() => {
			const _ = new LightMap();
			_.set( 'key2', 'value2' );
			_.set( 'key1', 'value1' );
			_.set( 'key', 'value' );
			
			const result = _.sortKeys();
			
			expect( [ ..._.keys() ][ 0 ] ).to.eq( 'key2' );
			expect( [ ..._.keys() ][ 1 ] ).to.eq( 'key1' );
			expect( [ ..._.keys() ][ 2 ] ).to.eq( 'key' );
			expect( [ ...result.keys() ][ 0 ] ).to.eq( 'key' );
			expect( [ ...result.keys() ][ 1 ] ).to.eq( 'key1' );
			expect( [ ...result.keys() ][ 2 ] ).to.eq( 'key2' );
		}
	);
	
	it( 'LightMap.sortValues should sort values alphanumerically',
		() => {
			const _ = new LightMap();
			_.set( 'key', 'value2' );
			_.set( 'key1', 'value1' );
			_.set( 'key2', 'value' );
			
			const result = _.sortValues();
			
			// To validate that insert order is maintained
			expect( [ ..._.entries() ][ 0 ][ 0 ] ).to.eq( 'key' );
			expect( [ ..._.entries() ][ 0 ][ 1 ] ).to.eq( 'value2' );
			expect( [ ..._.entries() ][ 1 ][ 0 ] ).to.eq( 'key1' );
			expect( [ ..._.entries() ][ 1 ][ 1 ] ).to.eq( 'value1' );
			expect( [ ..._.entries() ][ 2 ][ 0 ] ).to.eq( 'key2' );
			expect( [ ..._.entries() ][ 2 ][ 1 ] ).to.eq( 'value' );
			
			// Checks values are in order but also that the associated keys are being maintained
			expect( [ ...result.entries() ][ 0 ][ 0 ] ).to.eq( 'key2' );
			expect( [ ...result.entries() ][ 0 ][ 1 ] ).to.eq( 'value' );
			expect( [ ...result.entries() ][ 1 ][ 0 ] ).to.eq( 'key1' );
			expect( [ ...result.entries() ][ 1 ][ 1 ] ).to.eq( 'value1' );
			expect( [ ...result.entries() ][ 2 ][ 0 ] ).to.eq( 'key' );
			expect( [ ...result.entries() ][ 2 ][ 1 ] ).to.eq( 'value2' );
		}
	);
	
	it( 'LightMap.equals should deep check object equality',
		() => {
			const _ = new LightMap();
			_.set( 'a', '0' );
			_.set( 'b', '1' );
			_.set( 'c', '2' );
			
			const _1 = new LightMap();
			_1.set( 'a', '0' );
			_1.set( 'b', '1' );
			_1.set( 'c', '2' );
			
			expect( _.equals( _1 ) ).to.eq( true );
		}
	);
	
	it( 'LightMap.version should equal package version',
		() => {
			const _ = new LightMap();
			expect( _.version() ).to.eq( `v${ version }` );
			expect( LightMap.version() ).to.eq( `v${ version }` );
		}
	);
	
	it( 'LightMap.toObject should map a LightMap to an Object',
		() => {
			const _ = new LightMap();
			_.set( 'key', new LightMap( [
				[ 'keyA', 'valueA' ],
				[ 'keyB', new LightMap( [ [ 'key2', 'value2' ] ] ) ]
			] ) );
			
			const
				result   = _.toObject(),
				expected = { key: { keyA: 'valueA', keyB: { key2: 'value2' } } };
			
			expect( result ).to.deep.eq( expected );
		}
	);
	
	it( 'LightMap.mapToArray and LightMap.toJSON should return a tuple array prepared for reconstruction',
		() => {
			const _ = new LightMap();
			_.set( 'key', new LightMap( [ [ 'key1', 'value1' ] ] ) );
			
			const
				result      = _.toJSON(),
				result1     = _.mapToArray(),
				checkResult = new LightMap( result );
			
			expect( result[ 0 ].length ).to.eq( 2 );
			expect( result[ 0 ][ 0 ] ).to.eq( 'key' );
			expect( result[ 0 ][ 1 ][ 0 ].length ).to.eq( 2 );
			expect( result[ 0 ][ 1 ][ 0 ][ 0 ] ).to.eq( 'key1' );
			expect( result[ 0 ][ 1 ][ 0 ][ 1 ] ).to.eq( 'value1' );
			expect( result ).to.deep.eq( result1 );
			expect( checkResult instanceof LightMap ).to.eq( true );
			expect( checkResult.get( 'key' ) instanceof LightMap ).to.eq( true );
		}
	);
	
	it( 'Symbol.constructMapByPattern should return a tuple array prepared for reconstruction',
		() => {
			const _ = new LightMap();
			_.set( 'key', new LightMap( [ [ 'key1', 'value1' ] ] ) );
			
			const result = new LightMap( _.toJSON() );
			
			expect( result instanceof LightMap ).to.eq( true );
			expect( result.get( 'key' ) instanceof LightMap ).to.eq( true );
		}
	);
	
	it( 'Symbol.search and LightMap.indexOf should return the insert index of the specified key',
		() => {
			const _ = new LightMap();
			_.set( 'key', 'value' );
			_.set( 'key1', 'value1' );
			_.set( 'key2', 'value2' );
			
			expect( _.indexOf( 'key1' ) ).to.eq( 1 );
			expect( _.indexOf( 'key3' ) ).to.eq( -1 );
			expect( 'key1'.search( _ ) ).to.eq( 1 );
			expect( 'key3'.search( _ ) ).to.eq( -1 );
		}
	);
	
	it( 'Symbol.replace should replace a specified string with the value of the ',
		() => {
			const _ = new LightMap();
			_.set( '{{ name }}', 'LightMap' );
			_.set( '{{ version }}', LightMap.version() );
			
			expect( 'Module: {{ name }} {{ version }}'.replace( _ ) )
				.to.eq( `Module: LightMap ${ LightMap.version() }` );
		}
	);
	
	it( 'Symbol.toPrimitive( string ) and LightMap.toString should return JSON.stringify expected results',
		() => {
			const _ = new LightMap();
			_.set( 'key', new LightMap( [ [ 'a', 'b' ] ] ) );
			
			const
				result  = _.toString(),
				result1 = `${ _ }`;
			
			expect( typeof result === 'string' ).to.eq( true );
			expect( result ).to.eq( '[["key",[["a","b"]]]]' );
			expect( result === result1 ).to.eq( true );
		}
	);
	
	it( 'Symbol.toPrimitive( number ) and LightMap.size should return size of LightMap',
		() => {
			const _ = new LightMap();
			_.set( 'key', 'value' );
			
			const
				result  = _.size,
				result1 = +_;
			
			expect( typeof result === 'number' ).to.eq( true );
			expect( result ).to.eq( 1 );
			expect( result === result1 ).to.eq( true );
		}
	);
	
	it( 'Symbol.toStringTag should equal LightMap',
		() => expect( Object.prototype.toString.call( new LightMap() ) ).to.eq( '[object LightMap]' )
	);
	
	it( 'Symbol.hasInstance should be false if instance of Map',
		() => expect( new Map() instanceof LightMap ).to.eq( false )
	);
	
	it( 'Symbol.hasInstance should be true if instance of LightMap',
		() => expect( new LightMap() instanceof LightMap ).to.eq( true )
	);
} );
