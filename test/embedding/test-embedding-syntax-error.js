'use strict';

// Tests that a syntax error in the main script is reported and terminates the
// embedded environment. The script is evaluated by embedtest.cc.

const common = require('../common');
const { spawnSyncAndExit } = require('../common/child_process');

spawnSyncAndExit(
  common.resolveBuiltBinary('embedtest'),
  ['0syntax_error'],
  {
    status: 1,
    stderr: /SyntaxError: Invalid or unexpected token/,
  });
