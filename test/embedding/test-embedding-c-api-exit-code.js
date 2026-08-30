'use strict';

// Tests that process.exitCode is propagated through the C embedding API.

const common = require('../common');
const { spawnSyncAndExit } = require('../common/child_process');

spawnSyncAndExit(
  common.resolveBuiltBinary('embedtest'),
  ['c-api', 'process.exitCode = 8'],
  {
    status: 8,
    signal: null,
  });
