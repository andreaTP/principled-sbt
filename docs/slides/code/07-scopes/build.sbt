lazy val myName = settingKey[String]("this is my name")

myName in Global := "Foo" // (Global, Global, Global)
myName in ThisBuild := "Bar" // (ThisBuild, Global, Global)
myName in (ThisBuild, SaySomething, sayHello) := "BAZ"
