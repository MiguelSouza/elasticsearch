import { Router } from 'express';
import { ElasticsearchClient } from '../services/elasticsearch.service';
import { pg } from '../services/postgres.service';

const router = Router();
const esClient = ElasticsearchClient.getInstance();
const pgClient = pg;

router.get('/elastic', async (req, res) => {
  const { name = '', page = 1, size = 10 } = req.query;

  try {
    console.time('Elasticsearch query time');
    const result = await esClient.search({
      index: 'users',
      from: (Number(page) - 1) * Number(size),
      size: Number(size),
      query: {
        match: {
          name: {
            query: name.toString(),
            fuzziness: 'AUTO',
          },
        },
      },
    });
    console.timeEnd('Elasticsearch query time');

    const users = result.hits.hits.map(hit => hit._source);
    const total = typeof result.hits.total === 'number'
            ? result.hits.total
            : result.hits.total?.value ?? 0;
    res.json({ total, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Elastic search failed' });
  }
});

router.get('/postgres', async (req, res) => {
    const { name = '', page = 1, size = 10 } = req.query;
  
    try {
      console.time('Postgres total query time');
  
      const offset = (Number(page) - 1) * Number(size);
  
      console.time('Postgres data query');
      const result = await pgClient.query(
        `SELECT * FROM users WHERE name ILIKE $1 ORDER BY id LIMIT $2 OFFSET $3`,
        [`%${name}%`, size, offset]
      );
      console.timeEnd('Postgres data query');
  
      console.time('Postgres count query');
      const count = await pgClient.query(
        `SELECT COUNT(*) FROM users WHERE name ILIKE $1`,
        [`%${name}%`]
      );
      console.timeEnd('Postgres count query');
  
      console.timeEnd('Postgres total query time');
  
      res.json({ total: Number(count.rows[0].count), data: result.rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Postgres search failed' });
    }
  });
  

export default router;
