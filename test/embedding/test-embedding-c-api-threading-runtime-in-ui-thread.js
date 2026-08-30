'use strict';

// Tests driving a runtime's event loop from a host UI-style loop using
// node_embedding_runtime_config_set_task_runner().
// See test_main_c_api_threading_runtime_in_ui_thread() in
// embedtest_c_api_threading.c.

const common = require('../common');
const { spawnSyncAndAssert } = require('../common/child_process');

spawnSyncAndAssert(
  common.resolveBuiltBinary('embedtest'),
  [
    'c-api-threading-runtime-in-ui-thread',
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
