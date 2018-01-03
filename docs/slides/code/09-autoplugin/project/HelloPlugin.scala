import sbt._
import Keys._

object HelloPlugin extends AutoPlugin {
  object autoImport {
    val myName = settingKey[String]("this is my Name")
    val sayHello = taskKey[Unit]("say hello")
  }
  import autoImport._
  override def trigger = allRequirements
  override lazy val buildSettings = Seq(
    myName := "Andrea",
    sayHello := {
      println(s"Hello ${myName.value}")
    }
  )
}
