val checkVersion = taskKey[Unit]("let check the version")

checkVersion := {
  println(Dependencies.somethingVersion)
}
