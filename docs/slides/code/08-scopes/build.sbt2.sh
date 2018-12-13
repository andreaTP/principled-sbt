#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR


sbt 'set assembly / test := {}' 'assembly'


cd ../../../
