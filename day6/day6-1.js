const { exit } = require( 'process' );

fs = require( 'fs' );
fs.readFile( 'input.txt', 'utf8', function ( err, data )
{
  const input = data.replace( /\r\n/g, " " ).split( /\s{2}/ );
  let count = input.map( group => new Set( group.replace( /[ ]/g, "" ).split( '' ) ) )
    .reduce( ( sum, set ) => sum + set.size, 0 )

  console.log( count );
} );
