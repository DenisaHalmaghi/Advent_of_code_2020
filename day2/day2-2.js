const { exit } = require( 'process' );

fs = require( 'fs' );
fs.readFile( 'passwords.txt', 'utf8', function ( err, data )
{
  const input = data.split( /\r\n/ );

  const good = input.reduce( ( acc, current ) =>
  {
    const [ pattern, password ] = current.split( ':' );
    let [ positions, letter ] = pattern.split( ' ' );
    positions = positions.split( '-' );

    const totalOccurences = positions.reduce( ( occurences, currentPosition ) =>
    {
      return password[ currentPosition ] === letter ? occurences + 1 : occurences;
    }, 0 );

    return totalOccurences === 1 ? acc + 1 : acc;
  }, 0 );
  console.log( good );
} );