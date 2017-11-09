package com.claroaprende.config

import org.elasticsearch.client.transport.TransportClient
import org.elasticsearch.common.settings.Settings
import org.elasticsearch.common.transport.InetSocketTransportAddress
import org.elasticsearch.transport.client.PreBuiltTransportClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.net.InetAddress


@Configuration
open class ElasticSearchConfig {

    @Bean(destroyMethod="close")
    open fun transportClient(): TransportClient {
        return PreBuiltTransportClient(Settings.EMPTY)
                .addTransportAddress(InetSocketTransportAddress(InetAddress.getByName("localhost"), 9300))
    }
}