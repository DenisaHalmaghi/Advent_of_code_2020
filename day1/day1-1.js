const { exit } = require( 'process' );

fs = require( 'fs' );
fs.readFile( 'numbers.txt', 'utf8', function ( err, data )
{
  const pairs = {};
  const input = data.split( /\r\n/ );
  input.forEach( entry =>
  {
    if ( pairs[ 2020 - entry ] !== undefined )
    {
      console.log( entry * ( 2020 - entry ) );
      exit;
    }
    pairs[ entry ] = 2020 - entry;
  } );
} );