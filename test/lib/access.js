const { test } = require('tap')
const requireInject = require('require-inject')

test('should throw on unrecognized subcommand', (t) => {
  const access = requireInject('../../lib/access.js', {
    '../../lib/npm.js': {
      flatOptions: {}
    }
  })
  const expectedUsageError = '\nUsage: blerg is not a recognized subcommand.\n\nnpm access public [<package>]\nnpm access restricted [<package>]\nnpm access grant <read-only|read-write> <scope:team> [<package>]\nnpm access revoke <scope:team> [<package>]\nnpm access 2fa-required [<package>]\nnpm access 2fa-not-required [<package>]\nnpm access ls-packages [<user>|<scope>|<scope:team>]\nnpm access ls-collaborators [<package> [<user>]]\nnpm access edit [<package>]'

  access(['blerg'], (err) => {
    t.match(
      err,
      expectedUsageError,
      'should throw EUSAGE on missing subcommand'
    )
    t.end()
  })
})
