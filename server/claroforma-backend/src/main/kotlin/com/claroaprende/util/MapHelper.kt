package com.claroaprende.util

object MapHelper {
    fun dotAccess(map: Map<*, *>, path: String) : Any? {
        val pathItems = path.split(".")
        return dotAccess(map, pathItems)
    }

    fun dotAccess(map: Map<*, *>, pathItems: List<String>) : Any? {
        if (pathItems.size == 0) {
            throw IllegalArgumentException("pathItem cannot be empty")
        }
        else if (!map.containsKey(pathItems[0])) {
            return null
        }
        var entry = map[pathItems[0]]
        if (pathItems.size == 1) {
            return entry
        }
        else if (entry is  Map<*, *>) {
            val trimmedPathItems = pathItems.subList(1, pathItems.size)
            return dotAccess(entry, trimmedPathItems)
        } else {
            return null
        }
    }
}