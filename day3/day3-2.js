const { exit } = require( 'process' );

fs = require( 'fs' );
fs.readFile( 'input.txt', 'utf8', function ( err, data )
{
  const input = data.split( /\r\n/ );
  const charCount = input[ 0 ].length;
  const rows = input.length;

  const paths = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 }
  ]

  const countTrees = ( { right, down } ) =>
  {
    let sum = 0;
    for ( let i = 0, j = 0; i < rows; i += down, j = ( j + right ) % charCount )
    {
      if ( input[ i ][ j ] == "#" )
      {
        sum++
      }
    }
    return sum
  }

  const product = paths.map( path =>
  {
    return countTrees( path )
  } ).reduce( ( carry, trees ) =>
  {
    return carry * trees
  }, 1 )

  console.log( product )
} );