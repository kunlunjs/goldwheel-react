import { faker } from '@faker-js/faker'

type Overrides = Record<string, any>

export const userGenerator = (overrides?: Overrides) => ({
  id: faker.datatype.uuid(),
  bio: faker.lorem.sentence(),
  email: faker.internet.email(),
  first_name: faker.internet.userName(),
  last_name: faker.internet.userName(),
  password: faker.internet.password(),
  team_id: faker.datatype.uuid(),
  team_name: faker.company.name(),
  role: 'ADMIN',
  created_at: Date.now(),
  ...overrides
})

export const teamGenerator = (overrides?: Overrides) => ({
  id: faker.datatype.uuid(),
  name: faker.company.name(),
  description: faker.lorem.sentence(),
  created_at: Date.now(),
  ...overrides
})

export const discussionGenerator = (overrides?: Overrides) => ({
  id: faker.datatype.uuid(),
  title: faker.company.catchPhrase(),
  body: faker.lorem.sentence(),
  created_at: Date.now(),
  ...overrides
})

export const commentGenerator = (overrides?: Overrides) => ({
  id: faker.datatype.uuid(),
  body: faker.lorem.sentence(),
  created_at: Date.now(),
  ...overrides
})
