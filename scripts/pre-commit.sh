#!/usr/bin/env bash

if [[ "$NODE_ENV" == "production" || \
   "$NODE_ENV" == "travis" ]]
then
  echo "-- Skipped"
  exit 0;
fi

# create dir if not existent
mkdir -p .git/hooks

# Install yourself on first execution
if [ ! -f .git/hooks/pre-commit ]; then
  echo "Installing pre-commit hook..."
  ln -s ../../scripts/pre-commit.sh .git/hooks/pre-commit
fi

# Run all tests before every commit
npm test
