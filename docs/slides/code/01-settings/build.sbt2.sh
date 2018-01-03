#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR


sbt 'set myName := "Andrea"' 'settings -V' | grep myName


cd ../../../
