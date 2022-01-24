#!/bin/bash

# download tests
rm -rf devoir-1-tests
git clone https://github.com/UPB-FILS-ALF/devoir-1-tests.git

# run all tests
./devoir-1-tests/run.sh
