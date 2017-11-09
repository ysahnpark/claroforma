package com.claroaprende

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.ComponentScan

// @SpringBootApplication annotation requires the Application to be non-final.
// YOu will see error as: org.springframework.beans.factory.parsing.BeanDefinitionParsingException: Configuration problem: @Configuration class 'Application' may not be final. Remove the final modifier to continue.
// Making class final by default is one way of Kotlin enforcing good practice.
// To work around it, replace the annotation to the two below
//
@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan
open class Application

fun main(args: Array<String>) {
    SpringApplication.run(Application::class.java, *args)
}