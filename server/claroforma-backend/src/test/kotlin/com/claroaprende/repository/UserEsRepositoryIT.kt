package com.claroaprende.repository

import com.claroaprende.model.UserAccount
import org.assertj.core.api.Assertions
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner

/**
 * Created by Young-Suk on 10/28/2017.
 */

@RunWith(SpringRunner::class)
@SpringBootTest
class MapHelperTest {

    @Autowired
    lateinit var repo: UserEsRepository

    @Test
    fun test_crud() {

        val userAccount = UserAccount(sid="1", username = "test", password = "xyz",
                givenName = "John", familyName = "Doe")

        repo.save(userAccount)

        val fetched = repo.findOne("1")
        Assertions.assertThat(fetched).isNotNull()

        repo.delete("1")

        val fetched2 = repo.findOne("1")
        Assertions.assertThat(fetched2).isNull()
    }
}