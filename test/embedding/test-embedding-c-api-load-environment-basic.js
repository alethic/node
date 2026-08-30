'use strict';

// Tests that node_embedding_runtime_config_on_loading() runs the main script.
// See embedtest_c_api.c for the API usage.

const common = require('../common');
const { spawnSyncAndAssert } = require('../common/child_process');

spawnSyncAndAssert(
  common.resolveBuiltBinary('embedtest'),
  ['c-api', 'console.log(42)'],
  {
    trim: true,
    stdout: '42',
  });
