const { exit } = require( 'process' );

fs = require( 'fs' );
fs.readFile( 'input.txt', 'utf8', function ( err, data )
{
  const input = data.replace( /\r\n/g, " " ).split( /\s{2}/ );
  const requirements = validation()

  const matches = input.reduce( ( carry, passport ) =>
  {
    let isMatch = true;
    for ( const requirement in requirements )
    {
      const regex = `${ requirement }:([^ ]*)`;
      const match = passport.match( regex )
      let value = null;
      match && ( [ , value ] = match )

      if ( !match || !requirements[ requirement ]( value ) )
      {
        isMatch = false
        break
      }
    }
    return isMatch ? carry + 1 : carry
  }, 0 )
  console.log( matches );
} );

function validation ()
{
  return {
    byr: value => value >= 1920 && value <= 2002,
    iyr: value => value >= 2010 && value <= 2020,
    eyr: value => value >= 2020 && value <= 2030,
    hcl: value => value.match( /^#[0-9a-f]{6}$/ ),
    ecl: value => value.match( /^(amb|blu|brn|gry|grn|hzl|oth)$/ ),
    pid: value => value.match( /^[0-9]{9}$/ ),
    hgt: value =>
    {
      const cmMatch = value.match( /^([0-9]{3})cm$/ );
      const inMatch = value.match( /^([0-9]{2})in$/ );
      if ( cmMatch )
      {
        const [ , height ] = cmMatch
        return height >= 150 && height <= 193
      }
      else if ( inMatch )
      {
        const [ , height ] = inMatch
        return height >= 59 && height <= 76
      }
      return false
    }
  }
}