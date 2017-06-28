# ElasticSearch Cheat Sheet

## Open ports
9200 - HTTP for JSON
9300 - 

GET /_cat/indices?v

## Mapping

curl -XPUT 'http://localhost:9200/user' -d '
{
    "mappings": {
        "userinfo": {...
} 
'

curl -XPUT 'http://localhost:9200/user/_mapping/userinfo' -d '
{
    "userinfo" {
        ...
    }
}
'


### New in v. 5.0
Instead of using string type, use `text` for full-text search, and `keyword` for exact match.

In Kibana 5.0, no  need to install sense. just use Kibana's DevTools
http://localhost:5601/app/kibana#/dev_tools/console?_g=()