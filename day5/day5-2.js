const { exit } = require( 'process' );

fs = require( 'fs' );
fs.readFile( 'input.txt', 'utf8', function ( err, data )
{
  const input = data.split( /\r\n/ );
  let seats = [];
  let hMax;
  input.forEach( seatSequence =>
  {
    const [ vertical, horizontal ] = seatSequence.split( /((?:L|R)+)/, 2 )
    const vMax = 2 ** vertical.length - 1
    hMax = 2 ** horizontal.length - 1
    const [ row ] = searchStrip( [ ...vertical ], [ 0, vMax ] )
    const [ column ] = searchStrip( [ ...horizontal ], [ 0, hMax ], "L" )
    //do not add seats at the very front or very back
    if ( row !== hMax || column !== vMax )
    {
      seats.push( [ row, column ] )
    }
  } )
  seats = seats.sort( compareSeats )

  let current, previous, next
  let seat;
  for ( let i = 1; i < seats.length; i++ )
  {
    current = seats[ i ];
    previous = seats[ i - 1 ];

    const [ currentRow, currentColumn ] = current
    const [ previousRow, previousColumn ] = previous
    //1 seat missing - same row
    if ( previousColumn == currentColumn - 2 && currentRow == previousRow )
    {
      seat = [ currentRow, currentColumn - 1 ]
      break;
    }

    if ( previousRow == currentRow - 1 )
    {
      if ( previousColumn == hMax && currentColumn == 1 )
      {
        seat = [ currentRow, currentColumn - 1 ]
        break;
      }
      if ( previousColumn == hMax - 1 && !currentColumn )
      {
        seat = [ previousRow, hMax ]
        break;
      }
    }
  }
  console.log( seat[ 0 ] * 8 + seat[ 1 ] );
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

function compareSeats ( a, b )
{
  const [ rowA, colA ] = a
  const [ rowB, colB ] = b

  if ( rowA < rowB )
  {
    return -1
  }
  if ( rowB < rowA )
  {
    return 1
  }
  return colA - colB
}
