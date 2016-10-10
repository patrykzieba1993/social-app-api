#!/usr/bin/env bash

export NODE_ENV=${NODE_ENV:-test}
export LOGGING_DISABLED=true;

# run ES linter
eslint . &&

# run tests coverage
$(npm bin)/istanbul cover _mocha -- -R progress

# open report
open ./coverage/lcov-report/index.html