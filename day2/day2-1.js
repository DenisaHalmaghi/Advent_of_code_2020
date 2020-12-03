const { exit } = require( 'process' );

fs = require( 'fs' );
fs.readFile( 'passwords.txt', 'utf8', function ( err, data )
{
  const input = data.split( /\r\n/ );

  const good = input.reduce( ( acc, current ) =>
  {
    const [ pattern, password ] = current.split( ':' );
    const [ range, letter ] = pattern.split( ' ' );
    const [ min, max ] = range.split( '-' );
    const regex = new RegExp( `[${ letter }]{1}`, 'g' )
    const match = password.match( regex );
    if ( match && match.length >= min && match.length <= max )
    {
      return acc + 1
    }
    return acc;
  }, 0 );
  console.log( good );
} );