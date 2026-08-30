'use strict';

// Tests that the embedder can await a JS promise by spinning the event loop
// with node_embedding_runtime_event_loop_run_once(), for both a fulfilled and
// a rejected promise. See WaitMeWithCheese() in embedtest_c_api.c.

const common = require('../common');
const { spawnSyncAndAssert } = require('../common/child_process');

const embedtest = common.resolveBuiltBinary('embedtest');

spawnSyncAndAssert(
  embedtest,
  [
    'c-api',
    'function waitPromise(text) { ' +
      'return new Promise((res) => ' +
      '  setTimeout(() => res(text + " with cheese"), 1)); ' +
      '}',
  ],
  {
    stdout: 'waited with cheese',
  });

spawnSyncAndAssert(
  embedtest,
  [
    'c-api',
    'function waitPromise(text) { ' +
      'return new Promise((res, rej) => ' +
      '  setTimeout(() => rej(text + " without cheese"), 1)); ' +
      '}',
  ],
  {
    stdout: 'waited without cheese',
  });
