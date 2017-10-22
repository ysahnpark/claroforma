import * as elasticsearch from "elasticsearch";

export class ElasticSearchConnection {

  static esclient: elasticsearch.Client;

  /**
   * Creates the ElasticSearrch client instance
   * @param host host
   * @param opts connfig options @see https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html#config-options
   */
  public static connect(host: string, opts: any): elasticsearch.Client {

    const configOpts = Object.assign({
      host: host // "localhost:9200",
    }, opts);

    if (!ElasticSearchConnection.esclient) {
      ElasticSearchConnection.esclient = new elasticsearch.Client(configOpts);
    }

    return ElasticSearchConnection.esclient;
  }

  public static getClient(): elasticsearch.Client {
    return ElasticSearchConnection.esclient;
  }

}