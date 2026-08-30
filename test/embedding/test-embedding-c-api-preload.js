'use strict';

// Tests that the node_embedding_runtime_config_on_preload() callback runs on
// the main thread and on worker threads.
// See embedtest_c_api_preload.c for the API usage.

const common = require('../common');
const path = require('path');
const { spawnSyncAndAssert } = require('../common/child_process');

const preloadScript = path.join(__dirname, 'preload-with-worker.js');

spawnSyncAndAssert(
  common.resolveBuiltBinary('embedtest'),
  [
    'c-api-preload',
    `eval(require("fs").readFileSync(${JSON.stringify(preloadScript)}, "utf8"))`,
  ],
  { cwd: __dirname },
  {
    trim: true,
    stdout: 'preloadValue=42; worker preloadValue=42',
  });
