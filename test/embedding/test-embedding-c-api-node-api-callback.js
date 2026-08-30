'use strict';

// Tests that the embedder can hand a native callback to JS and then drain the
// event loop with node_embedding_runtime_event_loop_run_once() until it runs.
// See WaitMe() in embedtest_c_api.c.

const common = require('../common');
const { spawnSyncAndAssert } = require('../common/child_process');

spawnSyncAndAssert(
  common.resolveBuiltBinary('embedtest'),
  [
    'c-api',
    'function waitMe(text, cb) { setTimeout(() => cb(text + " you"), 1); }',
  ],
  {
    stdout: 'waited you',
  });
