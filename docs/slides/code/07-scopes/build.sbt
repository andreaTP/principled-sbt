val myName = settingKey[String]("this is my name")
val SaySomething = config("saysomething") describedAs("Group of actions to say something")
val sayHello = taskKey[Unit]("this will say hello")

Global / myName := "Foo" // (Zero, Zero, Zero)
ThisBuild / myName := "Bar" // (ThisBuild, Zero, Zero)
ThisBuild / SaySomething / sayHello / myName := "BAZ"
