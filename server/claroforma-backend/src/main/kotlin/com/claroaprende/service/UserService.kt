package com.claroaprende.service

import com.claroaprende.model.UserAccount
import com.claroaprende.repository.UserEsRepository
import org.apache.catalina.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

/**
 * Created by Young-Suk on 10/23/2017.
 */
@Service
class UserService @Autowired constructor(
        private val userRepo: UserEsRepository
){

    fun saveAccount(account: UserAccount): UserAccount {
        return this.userRepo.save(account)
    }

    fun getAccountByName(name: String, pageable: Pageable = PageRequest(1, 20)): Page<UserAccount> {
        return this.userRepo.findByName(name, pageable)
    }
}