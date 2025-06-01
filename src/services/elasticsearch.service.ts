import { Client } from '@elastic/elasticsearch';

export class ElasticsearchClient {
  private static instance: Client;

  static getInstance(): Client {
    if (!ElasticsearchClient.instance) {
      ElasticsearchClient.instance = new Client({
        node: process.env.ELASTIC_NODE || 'http://localhost:9200',
      });
      console.log('Connected to Elasticsearch');
    }
    return ElasticsearchClient.instance;
  }
}
