'use strict';

// Tests that createRequire() under the C embedding API still cannot access
// internals. The createRequire() call is in embedtest_c_api_common.c.

const common = require('../common');
const { spawnSyncAndExit } = require('../common/child_process');

spawnSyncAndExit(
  common.resolveBuiltBinary('embedtest'),
  ['c-api', 'require("lib/internal/test/binding")'],
  {
    status: 1,
    signal: null,
  });
