#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR


sbt 'ThisBuild/saysomething:sayHello::myName' 'ThisBuild / Zero / Zero / myName' 'Zero / Zero / Zero / myName'


cd ../../../
