'use strict';

// Tests that several runtimes can share a thread and interleave their event
// loops. See test_main_c_api_threading_several_runtimes_per_thread() in
// embedtest_c_api_threading.c.

const common = require('../common');
const { spawnSyncAndAssert } = require('../common/child_process');

spawnSyncAndAssert(
  common.resolveBuiltBinary('embedtest'),
  [
    'c-api-threading-several-runtimes-per-thread',
    'myCount = 0; ' +
      'function incMyCount() { ' +
      '  ++myCount; ' +
      '  if (myCount < 5) setTimeout(incMyCount, 1); ' +
      '}',
  ],
  {
    trim: true,
    stdout: '60',
  });
