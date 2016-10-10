#!/usr/bin/env bash

export NODE_ENV=${NODE_ENV:-test}
export LOGGING_DISABLED=true;

# run ES linter
eslint . &&

# run mocha test runner
$(npm bin)/mocha