'use strict';

// Tests that the same script fails when the platform is not given
// --experimental-vm-modules, so vm.SourceTextModule is unavailable.
// See embedtest_c_api_env.c for the API usage.

const common = require('../common');
const { spawnSyncAndExit } = require('../common/child_process');

spawnSyncAndExit(
  common.resolveBuiltBinary('embedtest'),
  ['c-api-env-with-no-esm-loader'],
  {
    status: 1,
    signal: null,
  });
