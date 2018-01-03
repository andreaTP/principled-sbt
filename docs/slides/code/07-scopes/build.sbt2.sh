#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR


sbt '{.}/saysomething:sayHello::myName' '{.}/*:*::myName' '*/*:*::myName'


cd ../../../
