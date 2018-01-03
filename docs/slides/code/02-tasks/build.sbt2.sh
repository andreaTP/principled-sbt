#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR


sbt 'set sayHello := { println("hello!") }' 'tasks -V' | grep sayHello


cd ../../../
