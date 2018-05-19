#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR


sbt 'set libraryDependencies += "dummy" % "dummy" % "1.0" % Test' 'libraryDependencies'


cd ../../../
