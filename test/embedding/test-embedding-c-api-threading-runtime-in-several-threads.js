'use strict';

// Tests that a single runtime's event loop can be driven from several threads
// in turn. See test_main_c_api_threading_runtime_in_several_threads() in
// embedtest_c_api_threading.c.

const common = require('../common');
const { spawnSyncAndAssert } = require('../common/child_process');

spawnSyncAndAssert(
  common.resolveBuiltBinary('embedtest'),
  [
    'c-api-threading-runtime-in-several-threads',
    'myCount = 0; ' +
      'function incMyCount() { ' +
      '  ++myCount; ' +
      '  if (myCount < 5) setTimeout(incMyCount, 1); ' +
      '}',
  ],
  {
    trim: true,
    stdout: '5',
  });
