package com.claroaprende.web.controller

import com.claroaprende.model.UserAccount
import com.claroaprende.service.UserService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
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
@RequestMapping(value = "api/v1/users")
class UserController @Autowired constructor(
        val userService: UserService
){

    val logger = LoggerFactory.getLogger(this.javaClass)

    @GetMapping(value = "", produces = arrayOf(MediaType.APPLICATION_JSON_VALUE))
    fun getUsers(@RequestParam(value = "name") name: String,
                 pageable: Pageable, request: HttpServletRequest) : Page<UserAccount> {

        return this.userService.getAccountByName(name)
    }

}