'use strict';

// Tests that the C embedding API runs non-ASCII source code. The variable
// comes from embedtest_c_api_common.c.

const common = require('../common');
const { spawnSyncAndAssert } = require('../common/child_process');

spawnSyncAndAssert(
  common.resolveBuiltBinary('embedtest'),
  ['c-api', 'console.log(embedVars.nön_ascıı)'],
  {
    trim: true,
    stdout: '🏳️‍🌈',
  });
