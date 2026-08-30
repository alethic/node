'use strict';

// Tests that the ESM loader is available to an embedded runtime when the
// platform is given --experimental-vm-modules.
// See embedtest_c_api_env.c for the API usage.

const common = require('../common');
const { spawnSyncAndExitWithoutError } = require('../common/child_process');

spawnSyncAndExitWithoutError(
  common.resolveBuiltBinary('embedtest'),
  ['c-api-env-with-esm-loader']);
