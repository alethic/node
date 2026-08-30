'use strict';

// Tests that createRequire() works correctly with local fs under the C
// embedding API. The createRequire() call is in embedtest_c_api_common.c.

const common = require('../common');
const fixtures = require('../common/fixtures');
const { spawnSyncAndExit } = require('../common/child_process');

const fixturePath = JSON.stringify(fixtures.path('exit.js'));
spawnSyncAndExit(
  common.resolveBuiltBinary('embedtest'),
  ['c-api', `require(${fixturePath})`, '92'],
  {
    status: 92,
    signal: null,
  });
