import { factory, primaryKey } from '@mswjs/data'

const models = {
  user: {
    id: primaryKey(String),
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    team_id: String,
    role: String,
    bio: String,
    created_at: Number
  },
  team: {
    id: primaryKey(String),
    name: String,
    description: String,
    created_at: Number
  },
  discussion: {
    id: primaryKey(String),
    title: String,
    body: String,
    team_id: String,
    created_at: Number
  },
  comment: {
    id: primaryKey(String),
    body: String,
    author_id: String,
    discussion_id: String,
    created_at: Number
  }
}

export const db = factory(models)

export type Model = keyof typeof db

export const loadDb = () =>
  Object.assign(JSON.parse(window.localStorage.getItem('msw-db') || '{}'))

export const persistDb = (model: Model) => {
  if (import.meta.env.NODE_ENV === 'test') return
  const data = loadDb()
  // @ts-ignore
  data[model] = db[model].getAll()
  window.localStorage.setItem('msw-db', JSON.stringify(data))
}

export const initializeDb = () => {
  const database = loadDb()
  Object.entries(db).forEach(([key, model]) => {
    const dataEntres = database[key]
    if (dataEntres) {
      dataEntres?.forEach((entry: Record<string, any>) => {
        model.create(entry)
      })
    }
  })
}

export const resetDb = () => {
  window.localStorage.clear()
}

initializeDb()
