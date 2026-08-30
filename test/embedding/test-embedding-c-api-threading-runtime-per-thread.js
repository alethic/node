'use strict';

// Tests that 12 runtimes can run concurrently, one per thread.
// See test_main_c_api_threading_runtime_per_thread() in
// embedtest_c_api_threading.c.

const common = require('../common');
const { spawnSyncAndAssert } = require('../common/child_process');

spawnSyncAndAssert(
  common.resolveBuiltBinary('embedtest'),
  ['c-api-threading-runtime-per-thread', 'myCount = 1'],
  {
    trim: true,
    stdout: '12',
  });
