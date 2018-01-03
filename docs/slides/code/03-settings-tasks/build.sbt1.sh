#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR


sbt 'set myName := "Andrea"' 'set sayHello := { println(s"hello ${myName.value}") }' 'sayHello'


cd ../../../
