lazy val SaySomething = config("saysomething") /*extend(Compile)*/ describedAs("Group of actions to say something")

libraryDependencies += "dummy" % "dummy" % "1.0" % SaySomething
