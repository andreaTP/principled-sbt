val myName = settingKey[String]("this is my name")

val prjA = project.in(file("prjA"))
  .settings( myName := "Foo" )

val prjB = project.in(file("prjB"))
  .settings( myName := "Bar" )
  // .dependsOn(prjA)

val root = project.in(file("."))
  .aggregate(prjA, prjB)
