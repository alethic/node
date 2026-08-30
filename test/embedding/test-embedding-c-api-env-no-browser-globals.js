'use strict';

// Tests node_embedding_runtime_flags_no_browser_globals. The runtime asserts
// that no browser globals leaked into globalThis.
// See embedtest_c_api_env.c for the API usage.

const common = require('../common');
const path = require('path');
const { spawnSyncAndExitWithoutError } = require('../common/child_process');

// The embedded script resolves ./test/common/globals relative to the cwd.
const projectRoot = path.resolve(__dirname, '..', '..');

spawnSyncAndExitWithoutError(
  common.resolveBuiltBinary('embedtest'),
  ['c-api-env-no-browser-globals'],
  { cwd: projectRoot });
