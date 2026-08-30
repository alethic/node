'use strict';

// Tests calling a JS function synchronously from the embedder through
// node_embedding_runtime_config_on_loaded().
// See CallMe() in embedtest_c_api.c.

const common = require('../common');
const { spawnSyncAndAssert } = require('../common/child_process');

spawnSyncAndAssert(
  common.resolveBuiltBinary('embedtest'),
  ['c-api', 'function callMe(text) { return text + " you"; }'],
  {
    stdout: 'called you',
  });
