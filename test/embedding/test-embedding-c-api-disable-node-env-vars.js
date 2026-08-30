'use strict';

// Tests node_embedding_platform_flags_disable_node_options_env works
// correctly. The flag is set in embedtest_c_api.c.

const common = require('../common');
const { spawnSyncAndExit } = require('../common/child_process');
const os = require('os');

if (process.config.variables.node_without_node_options) {
  common.skip('NODE_REPL_EXTERNAL_MODULE cannot be tested with --without-node-options');
}

const embedtest = common.resolveBuiltBinary('embedtest');
spawnSyncAndExit(
  embedtest,
  ['c-api', 'require("os")'],
  {
    env: {
      ...process.env,
      'NODE_REPL_EXTERNAL_MODULE': 'fs',
    },
  },
  {
    status: 9,
    signal: null,
    stderr: `${embedtest}: NODE_REPL_EXTERNAL_MODULE can't be used with kDisableNodeOptionsEnv${os.EOL}`,
  });
