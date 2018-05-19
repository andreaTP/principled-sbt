lazy val myName = settingKey[String]("this is my name")
lazy val prjA = project.in(file("prjA"))
lazy val SaySomething = config("saysomething") describedAs("Group of actions to say something")
lazy val sayHello = taskKey[Unit]("this will say hello")

myName := "andrea"

sayHello in (prjA, SaySomething, sayHello) := {
  val name = myName.value
  println(s"hello $name".toUpperCase)
}
