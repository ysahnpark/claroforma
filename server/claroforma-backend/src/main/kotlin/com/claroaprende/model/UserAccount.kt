package com.claroaprende.model

import org.springframework.data.annotation.Id
import java.time.LocalDate

/**
 * Created by Young-Suk on 10/23/2017.
 */
data class UserAccount(

        @Id
        val sid: String? = null,
        val username: String,
        val password: String,

        val verifiedInd: Boolean = false,
        val passwordResetToken: String? = null,
        val passwordResetExpires: LocalDate? = null,

        val givenName: String,
        val familyName: String,
        val middleName: String? = null,
        val pictureUri: String? = null,

        val dateOfBirth: LocalDate? = null,

        // preferences
        val locale: String? = null,
        val timezone: String? = null
) {
    @Suppress("unused")
    private constructor() : this(username = "", password = "", givenName = "", familyName =  "")
}