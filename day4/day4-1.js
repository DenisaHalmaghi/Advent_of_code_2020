const { exit } = require( 'process' );

fs = require( 'fs' );
fs.readFile( 'input.txt', 'utf8', function ( err, data )
{
  const input = data.replace( /\r\n/g, " " ).split( /\s{2}/ );

  const required = [ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid' ]

  const requiredSize = required.length
  const matches = input.reduce( ( carry, passport ) =>
  {
    let isMatch = 1;
    for ( let i = 0; i < requiredSize; i++ )
    {
      const regex = `${ required[ i ] }:[^ ]+`;

      if ( passport.match( regex ) === null )
      {
        isMatch = 0
        break
      };
    }

    return isMatch ? carry + 1 : carry
  }, 0 )
  console.log( matches );
} );
