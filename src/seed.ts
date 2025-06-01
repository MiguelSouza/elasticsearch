import { faker } from '@faker-js/faker';
import { createUsersTable, insertUser } from './services/postgres.service';
import { createIndex, indexUser } from './services/elastic';

interface UserData {
  name: string;
  email: string;
  bio: string;
}

async function seedData(total: number = 1_000_000, batchSize: number = 1000): Promise<void> {
  console.log(`Iniciando seed de ${total} usuários em lotes de ${batchSize}...`);

  await createUsersTable();
  await createIndex();

  let inserted = 0;

  while (inserted < total) {
    const batch: UserData[] = [];

    for (let i = 0; i < batchSize && inserted + i < total; i++) {
      const user: UserData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        bio: faker.lorem.sentences(2),
      };

      batch.push(user);
    }

    for (const userData of batch) {
      try {
        const user = await insertUser(userData.name, userData.email, userData.bio);
        await indexUser(user);
        inserted++;
      } catch (err: unknown) {
        const error = err as Error;
        console.error(`Erro ao inserir ${userData.email}:`, error.message);
      }
    }

    console.log(`Inseridos até agora: ${inserted}`);
  }

  console.log('Seed finalizado com sucesso.');
}

seedData().catch(err => {
  console.error('Falha no seed:', err);
});
