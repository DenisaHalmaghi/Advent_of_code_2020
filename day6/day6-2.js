const { Console } = require( 'console' );
const { exit } = require( 'process' );

fs = require( 'fs' );
fs.readFile( 'input.txt', 'utf8', function ( err, data )
{
  const input = data.replace( /\r\n/g, " " ).split( /\s{2}/ );

  let count = input.reduce( ( count, group ) =>
  {
    let answers = 0
    const peopleInGroup = group.split( /[ ]/g ).length
    const uniqueAnswers = new Set( group.replace( /[ ]/g, "" ).split( '' ) )
    uniqueAnswers.forEach( ( answer ) =>
    {
      const regexp = new RegExp( `((${ answer }){1})`, "g" )
      const matchCount = group.match( regexp ).length;
      if ( matchCount == peopleInGroup )
        answers++
    } )
    return count + answers
  }, 0 )

  console.log( count );
} );
