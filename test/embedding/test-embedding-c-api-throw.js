'use strict';

// Tests that uncaught exceptions are handled correctly by the C embedding API.

const common = require('../common');
const { spawnSyncAndExit } = require('../common/child_process');

spawnSyncAndExit(
  common.resolveBuiltBinary('embedtest'),
  ['c-api', 'throw new Error()'],
  {
    status: 1,
    signal: null,
  });
