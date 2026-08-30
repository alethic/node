'use strict';

// Tests that a syntax error in the main script is reported by the C embedding
// API. See embedtest_c_api.c for the API usage.

const common = require('../common');
const { spawnSyncAndExit } = require('../common/child_process');

spawnSyncAndExit(
  common.resolveBuiltBinary('embedtest'),
  ['c-api', '0syntax_error'],
  {
    status: 1,
    stderr: /SyntaxError: Invalid or unexpected token/,
  });
