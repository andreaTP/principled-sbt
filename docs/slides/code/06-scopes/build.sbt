val myName = settingKey[String]("this is my name")
val prjA = project.in(file("prjA"))
val SaySomething = config("saysomething") describedAs("Group of actions to say something")
val sayHello = taskKey[Unit]("this will say hello")

myName := "andrea"

sayHello in (prjA, SaySomething, sayHello) := {
  val name = myName.value
  println(s"hello $name".toUpperCase)
}
