lazy val myName = settingKey[String]("this is my name")

lazy val sayHello = taskKey[Unit]("this will say hello")
