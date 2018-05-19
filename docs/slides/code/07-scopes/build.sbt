lazy val myName = settingKey[String]("this is my name")
lazy val SaySomething = config("saysomething") describedAs("Group of actions to say something")
lazy val sayHello = taskKey[Unit]("this will say hello")

myName in Global := "Foo" // (Global, Global, Global)
myName in ThisBuild := "Bar" // (ThisBuild, Global, Global)
myName in (ThisBuild, SaySomething, sayHello) := "BAZ"
