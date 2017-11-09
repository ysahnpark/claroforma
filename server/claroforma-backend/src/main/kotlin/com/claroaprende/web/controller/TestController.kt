package com.claroaprende.web.controller

import org.slf4j.LoggerFactory
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

/**
 * Created by Young-Suk on 10/21/2017.
 */
@RestController
@RequestMapping(value = "api/v1/test")
class TestController {

    val logger = LoggerFactory.getLogger(this.javaClass)

    @GetMapping(value = "/ping", produces = arrayOf(MediaType.APPLICATION_JSON_VALUE))
    fun ping(@RequestParam(value = "data", defaultValue = "Test") data: String,
             request: HttpServletRequest) : Map<String, String> {

        return mapOf("request-from" to request.remoteAddr,
                "data" to data)
    }

}