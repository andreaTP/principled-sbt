#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR


sbt 'prjA / Saysomething / sayHello / sayHello'


cd ../../../
