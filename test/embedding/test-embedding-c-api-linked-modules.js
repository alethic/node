'use strict';

// Tests node_embedding_runtime_config_add_module(). Two linked modules are
// registered by the embedder and used from the main thread and from a worker
// thread, so each module initializer is expected to run twice.
// See embedtest_c_api_modules.c for the API usage.

const common = require('../common');
const path = require('path');
const { spawnSyncAndAssert } = require('../common/child_process');

const linkedModulesScript = path.join(__dirname, 'use-linked-modules.js');

spawnSyncAndAssert(
  common.resolveBuiltBinary('embedtest'),
  [
    'c-api-linked-modules',
    `eval(require("fs").readFileSync(${JSON.stringify(linkedModulesScript)}, "utf8"))`,
    '2', // Expected number of greeter module initializer calls.
    '2', // Expected number of replicator module initializer calls.
  ],
  { cwd: __dirname },
  {
    trim: true,
    stdout: 'main=Hello, World World; worker=Hello, Node Node',
  });
