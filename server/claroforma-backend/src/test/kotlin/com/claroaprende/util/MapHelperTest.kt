package com.claroaprende.util

import com.claroaprende.util.MapHelper.dotAccess
import org.assertj.core.api.Assertions
import org.junit.Before
import org.junit.Test

class MapHelperTest {

    val test = mutableMapOf<String, Any?>()

    @Before
    fun initialize() {
        this.test["one"] = mutableMapOf<String, Any?>("a" to "Hello one a")
        this.test["two"] = mutableMapOf<String, Any?>(
                "b" to mutableMapOf<String, Any?>( "uno" to "valor uno")
        )
    }


    @Test
    fun test_dotAccess_whenEmpty_returnNull() {
        val test = mutableMapOf<String, Any?>()
        var actual = dotAccess(test, "three")

        Assertions.assertThat(actual).isNull()
    }

    @Test
    fun test_dotAccess_whenOneLevelPathExists_returnValue() {

        var actual = dotAccess(this.test, "one.a")

        Assertions.assertThat(actual).isEqualTo("Hello one a")
    }

    @Test
    fun test_dotAccess_whenOneLevelPathIsMap_returnMap() {

        var actual = dotAccess(this.test, "two.b")

        Assertions.assertThat(actual is Map<*, *>).isTrue()
    }

    @Test
    fun test_dotAccess_whenTwoLevelPathExists_returnValue() {

        var actual = dotAccess(this.test, "two.b.uno")

        Assertions.assertThat(actual).isEqualTo("valor uno")
    }

    @Test
    fun test_dotAccess_whenLongerPath_returnNull() {

        var actual = dotAccess(this.test, "one.a.c")

        Assertions.assertThat(actual).isNull()
    }
}
