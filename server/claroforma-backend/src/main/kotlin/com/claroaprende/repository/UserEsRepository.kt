package com.claroaprende.repository

import com.claroaprende.model.UserAccount
import com.fasterxml.jackson.databind.ObjectMapper
import org.elasticsearch.client.Client
import org.elasticsearch.client.transport.TransportClient
import org.elasticsearch.common.xcontent.XContentType
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Component
import java.util.*


/**
 * Created by Young-Suk on 10/23/2017.
 */
@Component
class UserEsRepository @Autowired constructor(
        private val objectMapper: ObjectMapper,
        private val esCclient: TransportClient
) {

    companion object {
        const val INDEX_NAME = "user"
        const val TYPE_NAME = "account"
    }
    fun findByName(name: String, pageable: Pageable?): Page<UserAccount> {
        var page = PageImpl<UserAccount>(null, pageable, 0)
        return page
    }

    fun findOne(sid: String): UserAccount? {
        val response = esCclient.prepareGet(INDEX_NAME, TYPE_NAME, sid).get()
        if (response.isExists) {
            return objectMapper.readValue(response.sourceAsBytes, UserAccount::class.java)
        }
        return null
    }

    fun save(account: UserAccount): UserAccount {

        val accountWithSid = if (account.sid != null) account else {
            val uuid = UUID.randomUUID()
            val sid = uuid.toString()
            account.copy(sid = sid)
        }
        val json = objectMapper.writeValueAsBytes(accountWithSid)

        val response = esCclient.prepareIndex(INDEX_NAME, TYPE_NAME, accountWithSid.sid)
                .setSource(json, XContentType.JSON)
                .get()

        return accountWithSid
    }

    fun delete(sid: String) {
        val response = esCclient.prepareDelete(INDEX_NAME, TYPE_NAME, sid)
                .get()
    }
}