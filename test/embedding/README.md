# Embedding tests

These tests exercise the two embedding APIs exposed by Node.js:

* the C++ API declared in `src/node.h`, and
* the C API declared in `src/node_embedding_api.h`.

Both are documented in [doc/api/embedding.md](../../doc/api/embedding.md).

## The `embedtest` binary

All of the tests in this directory drive a single `embedtest` executable.
`test/embedding/embedtest_main.cc` provides its `main()` and dispatches on the
first argument to one of several entry points, each of which embeds Node.js in
a different way. The remaining arguments are forwarded with that first argument
removed, so an entry point sees a conventional `argv`.

When the first argument does not name an entry point it is left in place and
`cpp-api` runs, which is what keeps the C++ API tests free of a prefix.

| Argument                                       | Entry point                          | Source                          |
| ---------------------------------------------- | ------------------------------------ | ------------------------------- |
| _(none)_, `cpp-api`                            | C++ embedding API                    | `embedtest.cc`                  |
| `c-api`                                        | C embedding API                      | `embedtest_c_api.c`             |
| `c-api-nodejs-main`                            | `node_embedding_main_run()`          | `embedtest_c_api_run_main.c`    |
| `c-api-preload`                                | preload callback                     | `embedtest_c_api_preload.c`     |
| `c-api-linked-modules`                         | embedder-provided linked modules     | `embedtest_c_api_modules.c`     |
| `c-api-env-no-browser-globals`                 | `no_browser_globals` runtime flag    | `embedtest_c_api_env.c`         |
| `c-api-env-with-esm-loader`                    | ESM loader available                 | `embedtest_c_api_env.c`         |
| `c-api-env-with-no-esm-loader`                 | ESM loader unavailable               | `embedtest_c_api_env.c`         |
| `c-api-threading-runtime-per-thread`           | one runtime per thread               | `embedtest_c_api_threading.c`   |
| `c-api-threading-several-runtimes-per-thread`  | several runtimes sharing a thread    | `embedtest_c_api_threading.c`   |
| `c-api-threading-runtime-in-several-threads`   | one runtime used by several threads  | `embedtest_c_api_threading.c`   |
| `c-api-threading-runtime-in-ui-thread`         | runtime driven by a host event loop  | `embedtest_c_api_threading.c`   |

`embedtest_c_api_common.c` holds the script that the C API entry points load
into the runtime, plus the error-handling helpers shared by all of them.

## Files that are not tests

`preload-with-worker.js` and `use-linked-modules.js` are loaded into an
embedded runtime by `embedtest`, not run by the test runner. They do not match
its `test-*.js` pattern and they cannot `require('../common')`, so they are
exempted from the test-only lint rules in `test/eslint.config_partial.mjs`.

## Known gaps

* The V8 thread pool size cannot be set through the C API yet, so it is
  untested.
* There is no coverage for a failure raised from a preload callback or from a
  linked module initializer.
* The C API tests do not cover snapshots; only the C++ API does.
