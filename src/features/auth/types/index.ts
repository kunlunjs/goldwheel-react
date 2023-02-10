export type AuthUser = {
  id: string
  email: string
  first_name: string
  last_name: string
  bio: string
  role: 'ADMIN' | 'USER'
}

export type UserResponse = {
  jwt: string
  user: AuthUser
}
