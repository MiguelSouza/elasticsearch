import { ElasticsearchClient } from './elasticsearch.service';

const client = ElasticsearchClient.getInstance();
const INDEX_NAME = 'users';

export async function createIndex() {
  const exists = await client.indices.exists({ index: INDEX_NAME });

  if (!exists) {
    await client.indices.create({
      index: INDEX_NAME,
      mappings: {
        properties: {
          name: { type: 'text' },
          email: { type: 'keyword' },
          bio: { type: 'text' },
        },
      },
    });
    console.log('Índice "users" criado no Elasticsearch.');
  } else {
    console.log('Índice "users" já existe.');
  }
}

export async function indexUser(user: { id: number; name: string; email: string; bio: string }) {
  await client.index({
    index: INDEX_NAME,
    id: user.id.toString(),
    document: {
      name: user.name,
      email: user.email,
      bio: user.bio,
    },
  });
}
