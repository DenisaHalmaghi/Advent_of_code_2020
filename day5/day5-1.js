const { exit } = require( 'process' );

fs = require( 'fs' );
fs.readFile( 'input.txt', 'utf8', function ( err, data )
{
  const input = data.split( /\r\n/ );
  let highest = input.map( seatSequence =>
  {
    const [ vertical, horizontal ] = seatSequence.split( /((?:L|R)+)/, 2 )
    const [ row ] = searchStrip( [ ...vertical ], [ 0, 2 ** vertical.length - 1 ] )
    const [ column ] = searchStrip( [ ...horizontal ], [ 0, 2 ** horizontal.length - 1 ], "L" )
    return row * 8 + column
  } )
    .reduce( ( carry, current ) =>
    {
      return current > carry ? current : carry
    }, 0 )
  console.log( highest );
} );

function searchStrip ( sequence, limits, takeLower = "F" )
{
  return sequence.reduce( ( carry, letter ) =>
  {
    let [ lower, upper ] = carry
    if ( letter == takeLower ) //take lower
    {
      upper = lower + Math.floor( ( upper - lower ) / 2 )
    }
    else //take upper
    {
      lower = upper - Math.floor( ( upper - lower ) / 2 )
    }
    return [ lower, upper ]
  }, limits )
}
