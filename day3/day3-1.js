const { exit } = require( 'process' );

fs = require( 'fs' );
fs.readFile( 'input.txt', 'utf8', function ( err, data )
{
  const input = data.split( /\r\n/ );
  const charCount = input[ 0 ].length;
  const trees = input.reduce( ( { count, column }, rowData ) =>
  {
    count = rowData[ column % charCount ] == "#" ? count + 1 : count;
    return { count, column: column + 3 }
  }, { "count": 0, "column": 0 } )

  console.log( trees );
} );