const { exit } = require( 'process' );

fs = require( 'fs' );
fs.readFile( 'numbers.txt', 'utf8', function ( err, data )
{
  const pairs = {};
  const input = data.split( /\r\n/ );
  input.map( ( entry, index, initial ) =>
  {
    if ( 2020 - entry > 0 )
    {
      const copy = [ ...initial ];
      copy.splice( index, 1 );
      return { total: 2020 - entry, items: copy }
    }
  } ).map( object =>
  {
    if ( object !== undefined )
    {
      const { total, items } = object;
      const pairs = {};
      items.forEach( entry =>
      {
        if ( pairs[ total - entry ] !== undefined )
        {
          console.log( entry * ( total - entry ) * ( 2020 - total ) );
          exit( 0 );
        }
        pairs[ entry ] = total - entry;
      } );
    }
  } )
} );