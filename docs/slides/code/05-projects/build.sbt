lazy val myName = settingKey[String]("this is my name")

lazy val prjA = project.in(file("prjA"))
  .settings( myName := "Foo" )

lazy val prjB = project.in(file("prjB"))
  .settings( myName := "Bar" )
  // .dependsOn(prjA)

lazy val root = project.in(file("."))
  .aggregate(prjA, prjB)
