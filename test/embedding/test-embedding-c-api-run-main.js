'use strict';

// Tests node_embedding_main_run() without any embedder customization, which
// runs the Node.js CLI out of the shared library.
// See embedtest_c_api_run_main.c for the API usage.

const common = require('../common');
const { spawnSyncAndAssert } = require('../common/child_process');

spawnSyncAndAssert(
  common.resolveBuiltBinary('embedtest'),
  ['c-api-nodejs-main', '--eval', 'console.log("Hello World")'],
  {
    trim: true,
    stdout: 'Hello World',
  });
